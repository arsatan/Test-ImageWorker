import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve data items from the server', () => {
    const mockDataItems = [
      { guId: 'F46B1EDE-C33E-4C75-A3BE-2896212AB1AA', fileName: 'filenameX.png', base64FileData: 'filedata' },
      { guId: '7F0F6C90-FEC6-4D1F-B866-9230FDA22157', fileName: 'filenameY.png', base64FileData: 'filedata' }
    ];

    component.ngOnInit();

    const req = httpMock.expectOne('/api/dataitems');
    expect(req.request.method).toEqual('GET');
    req.flush(mockDataItems);

    expect(component.dataitems).toEqual(mockDataItems);
  });
});
