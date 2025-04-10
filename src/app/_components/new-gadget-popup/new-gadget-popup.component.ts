import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { GadgetService } from '@app/_services/gadget.service';

@Component({
  selector: 'app-new-gadget-popup',
  templateUrl: './new-gadget-popup.component.html',
  styleUrls: ['./new-gadget-popup.component.less']
})
export class NewGadgetPopupComponent implements OnInit {
  submitted = false;
  error = '';

  form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<NewGadgetPopupComponent>,
        private gadgetService: GadgetService,
        @Inject(MAT_DIALOG_DATA) data: any) {
    }

    ngOnInit() {
      this.form = this.fb.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          price: [10, []],
          stock: [1, []],
      });
    }
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    close() {
        this.dialogRef.close();
    }

    onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }
      console.log(this.form.value);
      if(this.form.valid) {
        this.gadgetService.saveNew(this.form.value).subscribe((data: any) => {
          if(data && data.changes == 1) {
            alert('Gadget added successufully.');
            this.dialogRef.close(true);
          } else {
            alert('Some error occured while saving data.');
          }
        });
      }
    }
  }
