import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../api.service';
import { AppContextService } from '../app-context.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { Observable , of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    const apiServiceStub = () => ({
      attemRegister: (email, password) => ({ subscribe: f => f({}) })
    });
    const appContextServiceStub = () => ({ createSession: email => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RegisterComponent],
      providers: [
        { provide: ApiService, useFactory: apiServiceStub },
        { provide: AppContextService, useFactory: appContextServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

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
    it('bad password', () => {
      component.password = '';
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
      
      const response = {
        id:1,
        token: 'abc'
      }
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(apiServiceStub, 'attemRegister').and.returnValue(of(response));
      component.onSubmit();
      expect(apiServiceStub.attemRegister).toBeDefined();
    });
  });
});
