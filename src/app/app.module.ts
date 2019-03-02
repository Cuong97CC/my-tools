import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
import { HttpHelper } from './_helpers/http'

import { AppComponent } from './app.component';
import { HtmlViewComponent } from './htmlView/htmlView.component';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HtmlViewComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MonacoEditorModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    HttpHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
