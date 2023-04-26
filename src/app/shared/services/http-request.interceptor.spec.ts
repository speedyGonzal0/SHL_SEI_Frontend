import { TestBed } from '@angular/core/testing';

import { HttpRequestInterceptor } from './http-request.interceptor';

describe('HttpInterceptorService', () => {
  let service: HttpRequestInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
