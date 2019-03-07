import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ProgressBarComponent } from '../shared/components/progress-bar/progress-bar.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    ProgressBarComponent,
    NotFoundComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    ProgressBarComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
