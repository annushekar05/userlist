import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppContextService } from './app-context.service';
import { AuthGaurdService } from './auth-gaurd.service';

describe('AuthGaurdService', () => {
  let service: AuthGaurdService;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const appContextServiceStub = () => ({ isLoggedIn: {} });
    TestBed.configureTestingModule({
      providers: [
        AuthGaurdService,
        { provide: Router, useFactory: routerStub },
        { provide: AppContextService, useFactory: appContextServiceStub }
      ]
    });
    service = TestBed.inject(AuthGaurdService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.inject(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      service.canActivate();
      expect(routerStub.navigate).toBeDefined();
    });
  });
});
