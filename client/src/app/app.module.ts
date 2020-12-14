import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ShareModule } from './share/share.module';
import { NavigationModule } from './navigation/navigation.module';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpErrorInterceptor } from './share/services/http-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SettingsService } from './share/utils/settings-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserModule,
    ShareModule,
    NavigationModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    })
  ],
  providers: [
    // SettingsService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    // { provide: APP_INITIALIZER, useFactory: appInitializerFactory, deps: [SettingsService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('environment', environment.production ? 'production' : 'debug');
  }
}

export function appInitializerFactory(settingsService: SettingsService) {
  return async () => await settingsService.load();
}
