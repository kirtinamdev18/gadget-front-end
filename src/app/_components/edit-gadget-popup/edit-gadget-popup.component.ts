import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { GadgetService } from '@app/_services/gadget.service';

@Component({
  selector: 'app-edit-gadget-popup',
  templateUrl: './edit-gadget-popup.component.html',
  styleUrls: ['./edit-gadget-popup.component.less']
})
export class EditGadgetPopupComponent implements OnInit {
  submitted = false;
  data: any = {};
  error = '';

  form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditGadgetPopupComponent>,
        private gadgetService: GadgetService,
        @Inject(MAT_DIALOG_DATA) data: any) {
          this.data = data;
    }

    ngOnInit() {
      this.form = this.fb.group({
          id: [this.data.id],
          title: [this.data.title, Validators.required],
          description: [this.data.description, Validators.required],
          price: [this.data.price, []],
          stock: [this.data.stock, []],
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
        this.gadgetService.update(this.form.value).subscribe((data: any) => {
          if(data && data.changes == 1) {
            alert('Gadget updated successufully.');
            this.dialogRef.close(true);
          } else {
            alert('Some error occured while saving data.');
          }
        });
      }
    }
  }

