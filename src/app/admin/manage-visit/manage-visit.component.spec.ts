import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVisitComponent } from './manage-visit.component';

describe('ManageVisitComponent', () => {
  let component: ManageVisitComponent;
  let fixture: ComponentFixture<ManageVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
