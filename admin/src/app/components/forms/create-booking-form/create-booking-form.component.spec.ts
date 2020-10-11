import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookingFormComponent } from './create-booking-form.component';

describe('CreateBookingFormComponent', () => {
  let component: CreateBookingFormComponent;
  let fixture: ComponentFixture<CreateBookingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBookingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
