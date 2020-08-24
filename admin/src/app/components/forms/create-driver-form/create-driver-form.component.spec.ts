import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDriverFormComponent } from './create-driver-form.component';

describe('CreateDriverFormComponent', () => {
  let component: CreateDriverFormComponent;
  let fixture: ComponentFixture<CreateDriverFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDriverFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDriverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
