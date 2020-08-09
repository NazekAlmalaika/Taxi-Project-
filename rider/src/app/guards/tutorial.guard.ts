import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class TutorialGuard implements CanActivate {
  constructor( private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.getStorageItem('tutorialComplete');
  }

  async getStorageItem(item) {
    console.log('calling');
    const result = await Storage.get({ key: item });
    let tutorialComplete = Boolean(result.value);
    if(tutorialComplete == undefined || tutorialComplete === false){
      this.router.navigateByUrl('/tutorial');
    }
    return tutorialComplete;
  }
  
}
