import {Injectable, OnInit} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild, Route,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, OnInit {

  roles : any;
  ngOnInit(){
    this.roles = this.authService.getRole()
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }


  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.isAuthenticated()){
      return true;
    }
    alert("You need to login");
    this.router.navigate(['login'])
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    // if(route.data['role'].includes(this.authService.getRole())){
    //   return true;
    // }

    return route.data['role'].forEach((role:string) => {
      if(this.authService.getRole()!.indexOf(role) > -1){
        return true
      }
      return false
    })


    alert("Unauthorized")
    this.router.navigate([''])
    return false;
  }

}
