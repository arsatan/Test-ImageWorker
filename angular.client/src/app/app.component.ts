import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileListComponent } from './file-list/file-list.component'
//import { LogOutputComponent } from './log-output/log-output.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor() { }
  @ViewChild(FileListComponent, { static: true }) fileList: FileListComponent | undefined;
  update() {
    this.fileList?.getDataItems();
  }
  ngOnInit() { }
  logValue = '';

  //OnSubmit(fileName: string) {
  //  console.log(fileName);
  //}
  srcFileForm = new FormGroup({ srcFileName: new FormControl('')});
  title = 'angular.client';
}
