import { componentFactoryName } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppContextService } from './app-context.service';

describe('AppContextService', () => {
  let service: AppContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AppContextService] });
    service = TestBed.inject(AppContextService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`isLoggedIn has default value`, () => {
    expect(service.isLoggedIn).toEqual(false);
  });
  describe('createSession', () => {
    it(`isLoggedIn has true value`, () => {
      service.createSession('abc@xyz.com');
      expect(service.isLoggedIn).toBeTrue();
    });
  });
  describe('destroySession', () => {
    it(`isLoggedIn has true value`, () => {
      service.destroySession();
      expect(service.isLoggedIn).toBeFalse();
    });
  })
});
