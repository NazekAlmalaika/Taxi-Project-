import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBillingMethodFormComponent } from './create-billing-method-form.component';

describe('CreateBillingMethodFormComponent', () => {
  let component: CreateBillingMethodFormComponent;
  let fixture: ComponentFixture<CreateBillingMethodFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBillingMethodFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBillingMethodFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
