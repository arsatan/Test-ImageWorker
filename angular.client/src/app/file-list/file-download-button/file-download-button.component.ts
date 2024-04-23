import { CommonModule } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { UrlsList } from './urls-list.json';

class DataItem {
  guId: string | undefined;
  fileName: string | undefined;
  fileData: string | undefined;
}

class StringProvider
{
  readAsURLData(dataURL: string) : string
  {
    return atob(dataURL.replace(/^data:\w+;base64,/, "")); // remove `data:text;base64,` }
  }
}

@Component({
  standalone: true,
  selector: 'file-download-button',
  templateUrl: './file-download-button.component.html',
  styleUrls: ['./file-download-button.component.css'],
  imports: [FormsModule, CommonModule]
})
export class FileDownloadButtonComponent implements OnInit, OnDestroy {
  @Input() fileName: string | undefined;
  @Output() update = new EventEmitter<boolean>();
  //public dataitems: DataItem[] = [];
  subscription: Subscription | undefined;
  status: "initial" | "processing" | "success" | "fail" = "initial";
  response = new HttpResponse<DataItem>;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onClick() {
    if (this.fileName)
    {
      UrlsList.forEach(async (urldata) => {
        await this.get(urldata.url + "/" + this.fileName,
          "выгрузка файла из " + urldata.url + "...");
        console.log("shit angular async/await: " + this.response.body?.fileName); ///
      });
    }
  }

  get(url: string, message: string): HttpResponse<DataItem> {
    //const httpOptions = {
    //  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //  observe: "response" as "response"
    //}
    var download$ = this.http.get<DataItem>(url, { observe: 'response' });
    this.status = "processing";
    this.subscription = download$.subscribe({
      next: (response) => {
        this.status = "success";
        this.update.emit(false);
        console.log(message);
        //console.log(response.body);
        this.response = response;
        getFileFromFileData(this.response.body)
        return this.response;
      },
      error: (error: any) => {
        this.status = "fail";
        this.update.emit(false);
        console.log(message + this.status);
        return throwError(() => error);
      },
      //complete: () =>
      //{
      //  return response;
      //}
    })
      return this.response;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}

function getFileFromFileData(body: DataItem | null) {
  if (body == null || body.fileData == null || body.fileName == null)
    return;
  const a = document.createElement("a");
  a.href = body.fileData;
  a.download = body.fileName;
  document.body.appendChild(a);
  a.click();
  //console.log(fileData);
}

