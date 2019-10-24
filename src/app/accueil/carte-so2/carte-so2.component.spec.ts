import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteSo2Component } from './carte-so2.component';

describe('CarteSo2Component', () => {
  let component: CarteSo2Component;
  let fixture: ComponentFixture<CarteSo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteSo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteSo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
