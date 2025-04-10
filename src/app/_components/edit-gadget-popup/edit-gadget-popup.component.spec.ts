import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGadgetPopupComponent } from './edit-gadget-popup.component';

describe('EditGadgetPopupComponent', () => {
  let component: EditGadgetPopupComponent;
  let fixture: ComponentFixture<EditGadgetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGadgetPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGadgetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
