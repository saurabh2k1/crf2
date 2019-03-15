import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorNavbarComponent } from './monitor-navbar.component';

describe('MonitorNavbarComponent', () => {
  let component: MonitorNavbarComponent;
  let fixture: ComponentFixture<MonitorNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
