import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';

class DataItem {
  guId: string | undefined;
  fileName: string | undefined;
  fileData: string | ArrayBuffer | null | undefined;
}

@Component({
  standalone: true,
  selector: 'log-output',
  templateUrl: './log-output.component.html',
  styleUrls: ['./log-output.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class LogOutputComponent implements OnInit, OnDestroy {
  @Input() message: string | undefined;
  //@Input() status: "initial" | "processing" | "success" | "fail" = "initial";
  subscription: Subscription | undefined;
  constructor() { }
  logValue = '';

  ngOnInit() {
  }

  ngOnChanges() {
  }

  //log(message: string) {
  //}

  ngOnDestroy() {
      this.subscription?.unsubscribe()
  }
}
