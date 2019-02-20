import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { AuthorizationService } from './services/authorization/authorization.service';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export function loadConfigurations(authService: AuthorizationService): Function {
  return () => authService.initialAuthCheck().toPromise();
}

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    UserPanelComponent,
    NotFoundPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [
    AuthorizationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigurations,
      deps: [AuthorizationService],
      multi: true,
    },
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
})
export class CoreModule { }
