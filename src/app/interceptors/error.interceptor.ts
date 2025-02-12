import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMsg = "";

                if (error.error instanceof ErrorEvent) {
                    console.log("[Client side error]");
                    errorMsg = `Error: ${error.error.message}`;
                } else {
                    console.log("[Server side error]");
                    errorMsg = this.getServerErrorMessage(error);
                }

                console.log("[intercept]", errorMsg);

                if (error.status === 401) {
                    // auto logout if 401 response returned from api
                    // location.reload(true);
                }

                return throwError(error);
            })
        );
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }
        }
    }
}
