import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRiderFormComponent } from './create-rider-form.component';

describe('CreateRiderFormComponent', () => {
  let component: CreateRiderFormComponent;
  let fixture: ComponentFixture<CreateRiderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRiderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRiderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
