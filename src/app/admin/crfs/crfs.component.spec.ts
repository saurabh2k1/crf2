import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrfsComponent } from './crfs.component';

describe('CrfsComponent', () => {
  let component: CrfsComponent;
  let fixture: ComponentFixture<CrfsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrfsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
