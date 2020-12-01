import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppContextService } from '../app-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  badEmail:boolean = false;
  badPassword:boolean = false;
  errorMessage = '';
  constructor(private apiService: ApiService, private appContextService: AppContextService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if(!!!this.email){
      this.badEmail = true;
      return;
    }
    if(!!!this.password){
      this.badPassword = true;
      return; 
    }
    this.apiService.attemLogin(this.email, this.password).subscribe((data) => {
      if(!!data.error){
        this.errorMessage = data.error.error;
      }else{
        this.appContextService.createSession(this.email);
        this.router.navigate(['user-list']);
      }
      
    },
    (error) => {
      this.errorMessage = error.error.error;
    });

  }

}