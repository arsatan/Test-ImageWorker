import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

import { FileListComponent } from './file-list/file-list.component';
import { FileUploadComponent } from '../app/file-upload/file-upload.component';
import { LogOutputComponent } from '../app/log-output/log-output.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, CommonModule,
    FormsModule,
    ReactiveFormsModule,

    FileListComponent,
    FileUploadComponent,
    LogOutputComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    //FileListComponent,
    //MatIconModule,
  ]
})
export class AppModule { }
