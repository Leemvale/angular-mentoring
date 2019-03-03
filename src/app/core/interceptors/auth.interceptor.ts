import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingBlockService } from '../services/loading-block/loading-block.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingBlockService,
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', localStorage.getItem('token') || ''),
    });
    return next.handle(authReq).pipe(
        finalize(() => this.loadingService.hide()),
      );
  }
}
