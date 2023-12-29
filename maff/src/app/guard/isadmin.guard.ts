
  // auth.guard.ts
  import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class isadminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = localStorage.getItem('role') // Your logic to check if the user is authenticated
    if (isAuthenticated==="admin") {
      return true;
    } else {
      this.router.navigate(['/auth/user']);
      return false;
    }
  }

}
