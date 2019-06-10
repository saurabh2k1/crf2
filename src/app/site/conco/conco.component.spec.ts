import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcoComponent } from './conco.component';

describe('ConcoComponent', () => {
  let component: ConcoComponent;
  let fixture: ComponentFixture<ConcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
