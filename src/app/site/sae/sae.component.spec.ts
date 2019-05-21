import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaeComponent } from './sae.component';

describe('SaeComponent', () => {
  let component: SaeComponent;
  let fixture: ComponentFixture<SaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
