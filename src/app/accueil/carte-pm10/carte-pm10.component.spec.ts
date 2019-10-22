import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartePm10Component } from './carte-pm10.component';

describe('CartePm10Component', () => {
  let component: CartePm10Component;
  let fixture: ComponentFixture<CartePm10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartePm10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartePm10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
