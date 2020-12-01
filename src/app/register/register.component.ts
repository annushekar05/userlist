import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppContextService } from '../app-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

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
    this.apiService.attemRegister(this.email, this.password).subscribe((data) => {
      if(!!data.error){
        this.errorMessage = data.error.error;
      }else{
        this.router.navigate(['login']);
      }
    },
    (error) => {
      this.errorMessage = error.error.error;
    });

  }

}
