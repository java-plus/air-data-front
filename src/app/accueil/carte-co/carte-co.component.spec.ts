import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteCoComponent } from './carte-co.component';

describe('CarteCoComponent', () => {
  let component: CarteCoComponent;
  let fixture: ComponentFixture<CarteCoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteCoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteCoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
