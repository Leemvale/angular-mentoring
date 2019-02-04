import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { AuthorizationService } from './services/authorization/authorization.service';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

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
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
})
export class CoreModule { }
