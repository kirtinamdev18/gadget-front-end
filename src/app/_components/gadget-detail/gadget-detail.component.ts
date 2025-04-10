import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GadgetService } from '@app/_services';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditGadgetPopupComponent } from '../edit-gadget-popup/edit-gadget-popup.component';

@Component({
  selector: 'app-gadget-detail',
  templateUrl: './gadget-detail.component.html',
  styleUrls: ['./gadget-detail.component.less']
})
export class GadgetDetailComponent implements OnInit {
  id!: any;
  data: any = {};

  constructor(private route: ActivatedRoute, 
    private gadgetService: GadgetService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    this.gadgetService.getGadget(this.id).subscribe((data: any) => {
      if(data) {
        this.data = data;
      } else {
        alert('Some error occured while fetching data.');
      }
    });
  }

  openEditGadgetPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = this.data;

    let dialogRef = this.dialog.open(EditGadgetPopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getData();
      }
    });
  }

}
