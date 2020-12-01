import { Component, OnInit } from '@angular/core';
import { AppContextService } from '../app-context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {

  constructor(private appContextService : AppContextService, private route: Router) { }

  ngOnInit(): void {
  }
  isLoggedIn = this.appContextService.isLoggedIn;
  loggedInEmail = this.appContextService.loggedInUserEmail;
  enableLogoutFlag: boolean = false;
  logOut(){
    this.appContextService.destroySession();
    this.route.navigate(['/login']);
  }
}
