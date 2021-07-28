import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AppInterceptorService } from "./shared/services/app-interceptor.service";
import { XHRBackend, HttpModule } from "@angular/http";
import { LoaderService } from "./shared/services/loader.service";
import { ToasterModule } from "angular2-toaster";
import { AlertService } from "./shared/services/alert.service";
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    HttpModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ToasterModule.forRoot(),
  ],
  providers: [{ provide: XHRBackend, useClass: AppInterceptorService },
    LoaderService,
    AlertService
  ],
  bootstrap: [AppComponent],
  exports:[MatDialogModule,MatIconModule,MatCardModule,MatInputModule,MatSelectModule],
  entryComponents:[
  ]
})
export class AppModule { }
