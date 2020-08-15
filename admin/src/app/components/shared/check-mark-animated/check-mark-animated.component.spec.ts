import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMarkAnimatedComponent } from './check-mark-animated.component';

describe('CheckMarkAnimatedComponent', () => {
  let component: CheckMarkAnimatedComponent;
  let fixture: ComponentFixture<CheckMarkAnimatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckMarkAnimatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckMarkAnimatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
