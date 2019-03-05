import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { AuthorizationService } from './services/authorization/authorization.service';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoadingBlockComponent } from './components/loading-block/loading-block.component';
import { LoadingBlockService } from './services/loading-block/loading-block.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    UserPanelComponent,
    NotFoundPageComponent,
    LoadingBlockComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AuthorizationService,
    LoadingBlockService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingBlockComponent,
  ],
})
export class CoreModule { }
