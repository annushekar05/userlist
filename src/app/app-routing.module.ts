import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { InvalidUrlComponent } from './invalid-url/invalid-url.component';
import { 
  AuthGaurdService as AuthGuard 
} from './auth-gaurd.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'    
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invalid-url',
    component: InvalidUrlComponent
  },
  {
    path: '**',
    redirectTo: 'invalid-url'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
