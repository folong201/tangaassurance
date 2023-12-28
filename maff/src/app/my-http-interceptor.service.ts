// http.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { LoaderService } from './services/loader/loader.service';
import { finalize } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(private loadeinService:LoaderService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Token");

    console.log(localStorage.getItem('token'));
    this.loadeinService.isLoading.next(true)
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + (localStorage.getItem('token') || '')),
    });
    return next.handle(modifiedReq).pipe(
      finalize(
        ()=>{
          this.loadeinService.isLoading.next(false)
        }
      )
    );
  }
}
