import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CapListComponent } from './cap-list.component';

describe('CapListComponent', () => {
  let component: CapListComponent;
  let fixture: ComponentFixture<CapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
