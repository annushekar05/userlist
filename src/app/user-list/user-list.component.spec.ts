import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(() => {
    const apiServiceStub = () => ({
      retrieveDelayedUserList: () => ({ subscribe: f => f({}) }),
      retrieveUserList: pgNumber => ({ subscribe: f => f({}) }),
      deleteUser: id => ({}),
      retrieveUser: searchedId => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserListComponent],
      providers: [{ provide: ApiService, useFactory: apiServiceStub }]
    });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`sortingEnabledFirstName has default value`, () => {
    expect(component.sortingEnabledFirstName).toEqual(false);
  });

  it(`sortingEnabledLastName has default value`, () => {
    expect(component.sortingEnabledLastName).toEqual(false);
  });

  it(`sortingEnabledEmail has default value`, () => {
    expect(component.sortingEnabledEmail).toEqual(false);
  });

  it(`badFirstName has default value`, () => {
    expect(component.badFirstName).toEqual(false);
  });

  it(`badLastName has default value`, () => {
    expect(component.badLastName).toEqual(false);
  });

  it(`noResultFound has default value`, () => {
    expect(component.noResultFound).toEqual(false);
  });

  it(`pageNum has default value`, () => {
    expect(component.pageNum).toEqual(1);
  });

  it(`isLoading has default value`, () => {
    expect(component.isLoading).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'retrieveDelayedUserList').and.callThrough();
      component.ngOnInit();
      expect(apiServiceStub.retrieveDelayedUserList).toHaveBeenCalled();
    });
  });

  describe('searchById', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'retrieveUser').and.callThrough();
      component.searchById();
      expect(apiServiceStub.retrieveUser).toHaveBeenCalled();
    });
  });
  describe('goToPage', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'retrieveUserList').and.returnValue(of({
        data:[{
          id:1,
          email:'',
          first_name:'',
          last_name:''
        }]
      }));
      component.searchById();
      expect(component.searchedId).toEqual('');
    });
  });
  describe('onSubmit', () => {
    it('bad first name', () => {
      component.onSubmit(1,'a','B');
      expect(component.badFirstName).toBeTrue();
      expect(component.badLastName).toBeFalse();
    });
    it('bad last name', () => {
      component.onSubmit(1,'A','B b');
      expect(component.badLastName).toBeTrue(); 
      expect(component.badFirstName).toBeFalse(); 
    });
  });
  describe('deleteUser', () => {
    it('test delete user name', () => {
      component.userList = [
        {
          id: 1,
          email:'',
          first_name: 'a',
          last_name: 'b',
          avatar: ''
        },
        {
          id: 2,
          email:'',
          first_name: 'c',
          last_name: 'b',
          avatar: ''
        },
        {
          id: 3,
          email:'',
          first_name: 'd',
          last_name: 'b',
          avatar: ''
        }
      ];
      component.deleteUser(1);
      expect(component.userList.length).toEqual(2);
    });
  });
  describe('sort', () => {
    it('email', () => {
      component.sort('email');
      expect(component.sortingEnabledEmail).toBeTrue();
    });
    it('first_name', () => {
      component.sort('first_name');
      expect(component.sortingEnabledFirstName).toBeTrue();
    });
    it('last_name', () => {
      component.sort('last_name');
      expect(component.sortingEnabledLastName).toBeTrue();
    });
  });
});
