import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartePm25Component } from './carte-pm25.component';

describe('CartePm25Component', () => {
  let component: CartePm25Component;
  let fixture: ComponentFixture<CartePm25Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartePm25Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartePm25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
