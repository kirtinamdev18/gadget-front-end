import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetTableComponent } from './gadget-table.component';

describe('GadgetTableComponent', () => {
  let component: GadgetTableComponent;
  let fixture: ComponentFixture<GadgetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GadgetTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GadgetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
