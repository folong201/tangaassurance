import { TestBed } from '@angular/core/testing';

import { MyHttpInterceptorService } from './my-http-interceptor.service';

describe('MyHttpInterceptorService', () => {
  let service: MyHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
