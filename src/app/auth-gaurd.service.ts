import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppContextService } from './app-context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private router: Router, private appContextService: AppContextService) {}
  canActivate(): boolean {
    if (!this.appContextService.isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
