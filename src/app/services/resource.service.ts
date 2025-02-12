import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { FilterConfig } from '../models';
import { environment } from '../../environments/environment.development';

export interface UrlConfig {
  id?: number;
  childId?: number;
  childEndpoint?: string;
}

export class ResourceService<T> {
  private url = environment.API_BASE_URL;

  constructor(private http: HttpClient, private endpoint: string) { }

  /**
   * Create a new instance of type `T`
   */
  public create(
    item?: T | T[] | any,
    childEndpoint?: string,
    childId?: number
  ): Observable<T> {
    const urlConfig: UrlConfig = {
      childId: childId,
      childEndpoint: childEndpoint,
    };
    return this.http
      .post<T>(this.urlBuild(urlConfig), item)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Update specific instance of `T`
   */
  public update(item?: T, id?: number): Observable<T> {
    return this.http
      .patch<T>(`${this.url}/${this.endpoint}/${id}`, item)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Find all instances of type `T`
   */
  public list(
    filterConfig: FilterConfig,
    childEndpoint?: string,
    childId?: number
  ): Observable<T[]> {
    const urlConfig: UrlConfig = {
      childId: childId,
      childEndpoint: childEndpoint,
    };
    return this.http
      .get<T[]>(
        this.urlBuild(urlConfig) +
        `?filter=${encodeURIComponent(
          JSON.stringify(filterConfig)
        )}`
      )
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Find an instance of type `T` by id
   */
  public read(
    id: number,
    childEndpoint?: string,
    childId?: number
  ): Observable<T> {
    const urlConfig: UrlConfig = {
      id: id,
      childId: childId,
      childEndpoint: childEndpoint,
    };
    return this.http
      .get<T>(this.urlBuild(urlConfig))
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Delete an instance of type `T` by id
   */
  public delete(id: number): Observable<any> {
    return this.http
      .delete<any>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Count number os instances of type `T`
   */
  public count(where: Object = {}): Observable<any> {
    return this.http
      .get<any>(
        `${this.url}/${this.endpoint}/count/?where=${encodeURIComponent(
          JSON.stringify(where)
        )}`
      )
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * Builds an url for a request
   */
  private urlBuild(urlConfig: UrlConfig): string {
    let finalUrl = "";
    finalUrl += `${this.url}/`;
    finalUrl += this.endpoint !== "" ? `${this.endpoint}/` : "";
    finalUrl += urlConfig.id ? `${urlConfig.id}/` : "";
    finalUrl += urlConfig.childEndpoint
      ? `${urlConfig.childEndpoint}/`
      : "";
    finalUrl += urlConfig.childId ? `${urlConfig.childId}/` : "";
    return finalUrl;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   */
  private handleError(error: HttpErrorResponse) {
    // console.log('handleError')

    const getAllLocalStorageItems = () => {
      const localStorageItems: { [key: string]: any } = {};

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          localStorageItems[key] = localStorage.getItem(key);
        }
      }

      return localStorageItems;
    }

    // Gather browser context
    const browserContext = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      screenWidth: screen.width,
      screenHeight: screen.height,
      cookies: document.cookie,
      localStorageData: getAllLocalStorageItems(),
      timestamp: new Date().toISOString()
    };

    // Combine error message and browser context
    const errorPayload = {
      errorMessage: error.message,
      status: error.status,
      statusText: error.statusText,
      browserContext: browserContext
    };

    // console.table(errorPayload)
    /* TODO: implement here where to send the error */

    return throwError(error);
  }
}
