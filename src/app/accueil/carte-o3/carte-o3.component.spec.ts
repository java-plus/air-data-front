import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteO3Component } from './carte-o3.component';

describe('CarteO3Component', () => {
  let component: CarteO3Component;
  let fixture: ComponentFixture<CarteO3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteO3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteO3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
