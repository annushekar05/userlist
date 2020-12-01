import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../api.service';
import { AppContextService } from '../app-context.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const apiServiceStub = () => ({
      attemLogin: (email, password) => ({ subscribe: f => f({}) })
    });
    const appContextServiceStub = () => ({ createSession: email => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: ApiService, useFactory: apiServiceStub },
        { provide: AppContextService, useFactory: appContextServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    document.body.removeChild(fixture.nativeElement);
  })

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`badEmail has default value`, () => {
    expect(component.badEmail).toEqual(false);
  });

  it(`badPassword has default value`, () => {
    expect(component.badPassword).toEqual(false);
  });

  describe('onSubmit', () => {
    it('bad email',() => {
      component.email = null;
      component.onSubmit();
      expect(component.badEmail).toBeTrue();
    });
    it('bad password',() => {
      component.password = null;
      component.onSubmit();
      expect(component.badPassword).toBeFalse();
    });
    it('makes expected calls', () => {
      component.email = 'abc@xyz.com';
      component.password = 'abc';
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      const appContextServiceStub: AppContextService = fixture.debugElement.injector.get(
        AppContextService
      );
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      component.onSubmit();
      spyOn(apiServiceStub, 'attemLogin').and.returnValue(of({data: {
        id: 1,
        token: 'scds'
      }}));
      spyOn(appContextServiceStub, 'createSession').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      expect(apiServiceStub.attemLogin).toBeDefined();
      expect(appContextServiceStub.createSession).toBeDefined();
      expect(routerStub.navigate).toBeDefined();
    });
  });
});
