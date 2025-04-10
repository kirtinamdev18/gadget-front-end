import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGadgetPopupComponent } from './new-gadget-popup.component';

describe('NewGadgetPopupComponent', () => {
  let component: NewGadgetPopupComponent;
  let fixture: ComponentFixture<NewGadgetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewGadgetPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGadgetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
