import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { UrlsList } from './urls-list.json';

//class DataItem {
//  guId: string | undefined;
//  fileName: string | undefined;
//  fileData: string | ArrayBuffer | null | undefined;
//}

@Component({
  standalone: true,
  selector: 'file-delete-button',
  templateUrl: './file-delete-button.component.html',
  styleUrls: ['./file-delete-button.component.css'],
  imports: [FormsModule, CommonModule]
})
export class FileDeleteButtonComponent implements OnInit, OnDestroy {
  @Input() fileName: string | undefined;
  @Output() update = new EventEmitter<boolean>();

  subscription: Subscription | undefined;
  status: "initial" | "processing" | "success" | "fail" = "initial";
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onClick() {
    if (this.fileName) {
      UrlsList.forEach((urldata) => this.delete(urldata.url + "/" + this.fileName, "удаление файла из " + urldata.url + "..."));
    }
  }

  delete(url: string, message: string) {
    //const httpOptions = {
    //  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //  observe: "response" as "response"
    //}
    var delete$ = this.http.delete(url);
    this.status = "processing";
    this.subscription = delete$.subscribe({
      next: () => {
        this.status = "success";
        this.update.emit(true);
        console.log(message);
      },
      error: (error: any) => {
        this.status = "fail";
        this.update.emit(false);
        console.log(message + this.status);
        return throwError(() => error);
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
