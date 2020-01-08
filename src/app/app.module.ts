import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ToastrModule } from 'ngx-toastr';
import { NgOpenCVModule } from 'ng-open-cv';
import { OpenCVOptions } from 'ng-open-cv/public_api';

import { routing } from './app.routing';
import { HttpHelper } from './_helpers/http'

import { AppComponent } from './app.component';
import { HtmlViewComponent } from './htmlView/htmlView.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ImageToTextComponent } from './imageToText/imageToText.component';

import { ProgressBarService } from './shared/services/progress-bar.service';

const openCVConfig: OpenCVOptions = {
  scriptUrl: `assets/opencv/opencv.js`,
  wasmBinaryFile: 'wasm/opencv_js.wasm',
  usingWasm: true
};

@NgModule({
  declarations: [
    AppComponent,
    HtmlViewComponent,
    ImageToTextComponent,
    TimelineComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    routing,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MonacoEditorModule.forRoot(),
    ToastrModule.forRoot(),
    NgOpenCVModule.forRoot(openCVConfig)
  ],
  providers: [
    HttpHelper,
    ProgressBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
