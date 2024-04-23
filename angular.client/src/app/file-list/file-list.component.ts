import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileDeleteButtonComponent } from "./file-delete-button/file-delete-button.component";
import { FileDownloadButtonComponent } from "./file-download-button/file-download-button.component";

interface DataItem {
  guId: string;
  fileName: string;
  base64FileData: string;
}

@Component({
  standalone: true,
  selector: 'file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
  imports: [CommonModule, FileDeleteButtonComponent, FileDownloadButtonComponent,]
})
export class FileListComponent implements OnInit, OnDestroy {
  public dataitems: DataItem[] = [];
  subscription: Subscription | undefined;
  fileName = '';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDataItems();
  }

  getDataItems() {
    this.subscription = this.http.get<DataItem[]>('/api/dataitems').subscribe(
      (result) => {
        this.dataitems = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  update(doUpdate: boolean) {
    //this.items.push(newItem);
    if (doUpdate) {
      this.getDataItems();
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
