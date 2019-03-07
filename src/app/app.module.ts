import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ToastrModule } from 'ngx-toastr';

import { routing } from './app.routing';
import { HttpHelper } from './_helpers/http'

import { AppComponent } from './app.component';
import { HtmlViewComponent } from './htmlView/htmlView.component';

import { ProgressBarService } from './shared/services/progress-bar.service';

@NgModule({
  declarations: [
    AppComponent,
    HtmlViewComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    routing,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MonacoEditorModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    HttpHelper,
    ProgressBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
