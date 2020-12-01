import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppContextService } from '../app-context.service';
import { Router } from '@angular/router';
import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(() => {
    const appContextServiceStub = () => ({ destroySession: () => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AppHeaderComponent],
      providers: [
        { provide: AppContextService, useFactory: appContextServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isLoggedIn has default value`, () => {
    const appContextServiceStub: AppContextService = fixture.debugElement.injector.get(
      AppContextService
    );
    expect(component.isLoggedIn).toEqual(appContextServiceStub.isLoggedIn);
  });

  it(`loggedInEmail has default value`, () => {
    const appContextServiceStub: AppContextService = fixture.debugElement.injector.get(
      AppContextService
    );
    expect(component.loggedInEmail).toEqual(
      appContextServiceStub.loggedInUserEmail
    );
  });

  it(`enableLogoutFlag has default value`, () => {
    expect(component.enableLogoutFlag).toEqual(false);
  });

  describe('logOut', () => {
    it('makes expected calls', () => {
      const appContextServiceStub: AppContextService = fixture.debugElement.injector.get(
        AppContextService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(appContextServiceStub, 'destroySession').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      component.logOut();
      expect(appContextServiceStub.destroySession).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
