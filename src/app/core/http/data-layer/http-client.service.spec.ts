import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientService } from './http-client.service';
import { environment } from 'src/environments/environment';

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientService],
    });

    service = TestBed.inject(HttpClientService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should send a POST request to the login endpoint', () => {
    const username = 'root';
    const password = '28A3_0005';
    const expectedResponse = { /* Expected response object */ };

    service.post('user_profiles/login/', { username, password }).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/user_profiles/login/`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ username, password });

    req.flush(expectedResponse);
  });
});
