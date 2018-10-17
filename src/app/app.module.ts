import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { HeaderComponent } from './common/header/header.component';
import { CompanyComponent } from './modules/company/company.component';
import { MaterialModules } from './common/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompanyListComponent } from './modules/company-list/company-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SignInComponent } from './modules/sign-in/sign-in.component';
import { SignupComponent } from './modules/signup/signup.component';
import { AuthInterceptor } from './common/auth/auth-interceptor';
import { ErrorInterceptor } from './common/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompanyComponent,
    CompanyListComponent,
    SignInComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
