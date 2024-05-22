import {CanActivateFn, Router} from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('userId')) {
    return true;
  }
  const router: Router = new Router();
  router.navigate(['/login']).then((_) => { });
  return false;
};
