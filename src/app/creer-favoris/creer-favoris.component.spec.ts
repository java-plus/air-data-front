import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerFavorisComponent } from './creer-favoris.component';

describe('CreerFavorisComponent', () => {
  let component: CreerFavorisComponent;
  let fixture: ComponentFixture<CreerFavorisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerFavorisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
