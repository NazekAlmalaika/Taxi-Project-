import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderManagementComponent } from './rider-management.component';

describe('TableListComponent', () => {
  let component: RiderManagementComponent;
  let fixture: ComponentFixture<RiderManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
