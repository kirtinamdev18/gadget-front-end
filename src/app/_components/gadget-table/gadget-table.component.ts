import { Component, OnInit } from '@angular/core';
import { Gadget, GadgetTable } from '@app/_models';
import { GadgetService } from '@app/_services';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-gadget-table',
  templateUrl: './gadget-table.component.html',
  styleUrls: ['./gadget-table.component.less']
})
export class GadgetTableComponent implements OnInit {
  loading:boolean = false;
  gadgets?: Gadget[];

  constructor(private gadgetService: GadgetService) { }

  ngOnInit() {}

  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'price',
    'status',
    'stock'
  ];

  empTable!: GadgetTable;

  totalData!: number;
  GadgetData!: Gadget[];

  dataSource = new MatTableDataSource<Gadget>();

  @ViewChild('paginator') paginator!: MatPaginator;

  pageSizes = [3, 5, 7];

  getTableData$(pageNumber: Number, pageSize: Number) {
    return this.gadgetService.getGadgets(pageNumber, pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

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
        this.GadgetData = gadgetData;
        this.dataSource = new MatTableDataSource(this.GadgetData);
      });
  }
}
