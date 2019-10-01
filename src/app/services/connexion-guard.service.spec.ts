import { TestBed } from '@angular/core/testing';

import { ConnexionGuardService } from './connexion-guard.service';

describe('ConnexionGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnexionGuardService = TestBed.get(ConnexionGuardService);
    expect(service).toBeTruthy();
  });
});
