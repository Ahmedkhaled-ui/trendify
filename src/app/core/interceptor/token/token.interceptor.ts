import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platForm = inject(PLATFORM_ID);

  if (isPlatformBrowser(platForm)) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('userToken') || '',
      },
    });
  }

  return next(req);
};
