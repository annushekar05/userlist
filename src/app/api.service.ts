import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { DataServiceConst } from './app-context.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  attemLogin(email, password) {
    return this.http.post<any>(environment.reqresUrl+DataServiceConst.LOGIN, {
      "email": email,
      "password": password
    })
  }
  attemRegister(email, password) {
    return this.http.post<any>(environment.reqresUrl+DataServiceConst.REGISTER, {
      "email": email,
      "password": password
    })
  }
  retrieveUserList(pageNum){
    return this.http.get<any>(environment.reqresUrl+DataServiceConst.LIST_USERS+'?page='+pageNum);
  }
  retrieveDelayedUserList(){
    return this.http.get<any>(environment.reqresUrl+DataServiceConst.LIST_USERS+'?delay=3');
  }
  deleteUser(id){
    return this.http.delete<any>(environment.reqresUrl+DataServiceConst.LIST_USERS+'/'+id);
  }
  retrieveUser(id){
    return this.http.get<any>(environment.reqresUrl+DataServiceConst.LIST_USERS+'/'+id);
  }
  dispatch(url){

  }
}