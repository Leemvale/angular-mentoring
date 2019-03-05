import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import { LoginModule } from './login/login.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from './ngrx/reducers/user.reducer';
import { LoginEffects } from './ngrx/effects/login.effects';
import { environment } from '../environments/environment';
import { clearState } from './ngrx/reducers/clearState.reducer';
import { StoreModel } from './store.model';
import { FinishAppInitializer, LoadUser, StartAppInitializer } from './ngrx/actions/app.actions';
import { skip, take } from 'rxjs/operators';
import { coursesReducer } from './ngrx/reducers/courses.reducer';
import { CoursesEffects } from './ngrx/effects/courses.effects';


export function initApplication(store: Store<StoreModel>): Function {
  return () => new Promise((resolve: Function) => {
    store.dispatch(new StartAppInitializer());
    store.dispatch(new LoadUser());
    store.select((state: StoreModel) => state.user).pipe(
      skip(1),
      take(1),
    ).subscribe(
      () => {
      store.dispatch(new FinishAppInitializer());
      resolve(true);
    });
  });
}

const mainReducer = {
  user: userReducer,
  courses: coursesReducer,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CoursesModule,
    LoginModule,
    StoreModule.forRoot(mainReducer, { metaReducers: [clearState] }),
    EffectsModule.forRoot([LoginEffects, CoursesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    HttpClient,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      deps: [[new Inject(Store)]],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
