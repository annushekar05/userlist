import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { InvalidUrlComponent } from './invalid-url/invalid-url.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ApiService } from './api.service';
import { AppContextService } from './app-context.service';
import { AuthGaurdService } from './auth-gaurd.service';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    InvalidUrlComponent,
    AppHeaderComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService,
    AppContextService,
    AuthGaurdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
