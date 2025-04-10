import { Component, OnInit } from '@angular/core';
import { Gadget, GadgetTable } from '@app/_models';
import { GadgetService } from '@app/_services';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { NewGadgetPopupComponent } from '../new-gadget-popup/new-gadget-popup.component';
import { EditGadgetPopupComponent } from '../edit-gadget-popup/edit-gadget-popup.component';

@Component({
  selector: 'app-gadget-table',
  templateUrl: './gadget-table.component.html',
  styleUrls: ['./gadget-table.component.less']
})
export class GadgetTableComponent implements OnInit {
  loading:boolean = false;
  gadgets?: Gadget[];

  constructor(
    private gadgetService: GadgetService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {}

  displayedColumns: string[] = [
    'bulkCheckbox',
    'id',
    'title',
    'description',
    'price',
    'stock',
    'action'
  ];

  empTable!: GadgetTable;

  totalData!: number;
  GadgetData!: Gadget[];

  dataSource = new MatTableDataSource<Gadget>();

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizes = [5, 10, 20, 50];

  getTableData$(pageNumber: Number, pageSize: Number) {
    return this.gadgetService.getGadgets(pageNumber, pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getGadgetData();
    
  }

  getGadgetData() {
    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading = true;
          return this.getTableData$(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((gadgetData) => {
          if (gadgetData == null) return [];
          this.totalData = gadgetData.total;
          this.loading = false;
          return gadgetData.data;
        })
      )
      .subscribe((gadgetData) => {
        gadgetData.forEach((item: any) => {
          item['checked'] = false;
        });
        this.GadgetData = gadgetData;
        this.dataSource = new MatTableDataSource(this.GadgetData);
      });
  }

  openNewGadgetPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';

    let dialogRef = this.dialog.open(NewGadgetPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getGadgetData();
      }
    });
  }

  deleteGadget(data: any) {
    if(confirm('Are you sure to delete?')) {
      this.gadgetService.deleteGadget(data).subscribe((data: any) => {
        if(data && data.changes == 1) {
          this.getGadgetData();
          alert('Gadget deleted successufully.');
        } else {
          alert('Some error occured while deleting data.');
        }
      });
    }
  }

  checkIfGadgetSelected() {
    return (this.GadgetData.filter(item => item.checked).length == 0);
  }

  bulkDelete() {
    if(confirm('Are you sure to delete?')) {
      const selectedIds = this.GadgetData.filter(item => item.checked)
      .map(item => item.id);
      this.gadgetService.deleteMultipleGadget({selectedIds: selectedIds}).subscribe((data: any) => {
        if(data && data.changes != 0) {
          this.getGadgetData();
          alert('Gadget deleted successufully.');
        } else {
          alert('Some error occured while deleting data.');
        }
      });
    }
  }
}
