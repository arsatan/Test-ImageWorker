import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { UrlsList } from './urls-list.json';

class DataItem {
  guId: string | undefined;
  fileName: string | undefined;
  fileData: string | ArrayBuffer | null | undefined;
}

@Component({
  standalone: true,
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class FileUploadComponent implements OnInit, OnDestroy {
  //@Input() fileName: string | undefined;
  @Output() update = new EventEmitter<boolean>();
  subscription: Subscription | undefined;
  status: "initial" | "processing" | "success" | "fail" = "initial";
  file: File | null = null;
  fileName = '';
  logValue = '';
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
 
  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.status = "initial";
      this.file = file;
    }
  }

  onClick() {
    if (this.file) {
          const dataitem = new DataItem();
          let reader = new FileReader();
          reader.readAsDataURL(this.file);
          reader.onload = () => {
            console.log(reader.result);
            dataitem.fileData = reader.result
            dataitem.fileName = this.file?.name;
            UrlsList.forEach((urldata) => this.upload(urldata.url, dataitem, "отправка файла в " + urldata.url + "..."));
            //this.upload("/api/DataItems", dataitem, "отправка файла в БД...");
            //this.upload("https://httpbin.org/post", dataitem.fileData, "отправка на https://httpbin.org/post...");
      };
    }
  }

  upload(url: string, dataitem: DataItem | string | ArrayBuffer | null, message: string)
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: "response" as "response"
    }
    var upload$ = this.http.post(url, dataitem, httpOptions);
    this.status = "processing";
    this.subscription = upload$.subscribe({
      next: () => {
        this.status = "success";
        this.update.emit(true);
        this.logValue = this.logValue + message;
      },
      error: (error: any) => {
        this.status = "fail";
        this.update.emit(true);
        this.logValue = this.logValue + message + this.status + "\r\n";
        return throwError(() => error);
      },
      complete: () =>
      {
        this.logValue = this.logValue + this.status + "\r\n";
      }
    })
  }

  ngOnDestroy() {
      this.subscription?.unsubscribe()
  }
}
