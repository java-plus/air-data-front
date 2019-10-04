import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SousLaCarteComponent } from './sous-la-carte.component';

describe('SousLaCarteComponent', () => {
  let component: SousLaCarteComponent;
  let fixture: ComponentFixture<SousLaCarteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SousLaCarteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SousLaCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
