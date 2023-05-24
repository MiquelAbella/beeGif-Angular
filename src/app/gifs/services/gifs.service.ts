import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Gif,
  GifResponse,
  GifsResponse,
  deleteGifsResponse,
  editGifsResponse,
  uploadFormValues,
} from '../interfaces/gif.interface';
import { Observable, catchError, of } from 'rxjs';

const BASE_URL = 'http://localhost:4000/gifs';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.getGifs();
  }

  public getGifs(): void {
    this.http.get(BASE_URL).subscribe((res: any) => {
      if (res.ok) {
        this.gifList = res.gifs;
      }
    });
  }

  public getGifById(id: string): Observable<GifResponse | undefined> {
    return this.http.get<GifResponse | undefined>(`${BASE_URL}/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    );
  }

  public getGifByTag(tag: string): void {
    this.http.get<GifsResponse>(`${BASE_URL}/tag/${tag}`).subscribe((res) => {
      if (res.ok) {
        this.gifList = res.gifs;
      } else {
        this.gifList = [];
      }
    });
  }

  public editTitle(
    id: string | undefined,
    newTitle: string
  ): Observable<editGifsResponse> {
    return this.http
      .post<editGifsResponse>(`${BASE_URL}/edit`, { id, newTitle })
      .pipe(
        catchError((error) => {
          console.log(error);
          return of(error);
        })
      );
  }

  public deleteGif(
    id: string | undefined
  ): Observable<deleteGifsResponse | undefined> {
    return this.http
      .delete<deleteGifsResponse | undefined>(`${BASE_URL}/${id}`)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  }

  public uploadGif(uploadFormValues: uploadFormValues) {
    this.http
      .post<GifResponse>(`${BASE_URL}/addfromurl`, uploadFormValues)
      .subscribe((res) => {
        if (res.ok) {
          this.gifList = [res.gif, ...this.gifList];
        } else {
          this.gifList = [];
        }
      });
  }
}
