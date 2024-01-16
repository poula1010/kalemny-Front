import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { authInterceptor } from './auth/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  //withInterceptors([authInterceptor]),
  providers: [provideRouter(routes), provideHttpClient(withFetch(), withInterceptors([authInterceptor])), AuthService]
};
