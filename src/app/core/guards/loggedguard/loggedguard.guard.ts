import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (isPlatformBrowser(PLATFORM_ID)) {
    if (localStorage.getItem('userToken')) {
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
  return true;
};
