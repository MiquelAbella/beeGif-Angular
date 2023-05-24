import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GifsResponse } from 'src/app/gifs/interfaces/gif.interface';
import { Observable, catchError, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private baseUrl = 'http://localhost:4000/gifs';
  public isLogging = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) {}

  search(query: string): Observable<GifsResponse | undefined> {
    return this.http
      .get<GifsResponse>(`${this.baseUrl}/search/${query}`)
      .pipe(catchError(() => of(undefined)));
  }

  toggleLoginModal() {
    this.isLogging.next(!this.isLogging.value);
  }
}
