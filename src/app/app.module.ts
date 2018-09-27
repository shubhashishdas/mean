import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { HeaderComponent } from './common/header/header.component';
import { CompanyComponent } from './modules/company/company.component';
import { MaterialModules } from './common/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyListComponent } from './modules/company-list/company-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CompanyComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
