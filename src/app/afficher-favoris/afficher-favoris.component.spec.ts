import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherFavorisComponent } from './afficher-favoris.component';

describe('AfficherFavorisComponent', () => {
  let component: AfficherFavorisComponent;
  let fixture: ComponentFixture<AfficherFavorisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherFavorisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
