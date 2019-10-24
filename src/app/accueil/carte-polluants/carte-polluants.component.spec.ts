import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartePolluantsComponent } from './carte-polluants.component';

describe('CartePolluantsComponent', () => {
  let component: CartePolluantsComponent;
  let fixture: ComponentFixture<CartePolluantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartePolluantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartePolluantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
