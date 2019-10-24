import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteNo2Component } from './carte-no2.component';

describe('CarteNo2Component', () => {
  let component: CarteNo2Component;
  let fixture: ComponentFixture<CarteNo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteNo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteNo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
