import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, BehaviorSubject, tap } from 'rxjs';
import {
  FormValues,
  LoginResponse,
  User,
} from '../gifs/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:4000/user';
  public user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient) {}

  login(formValues: FormValues): Observable<LoginResponse | undefined> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, {
        ...formValues,
      })
      .pipe(
        tap((res) => console.log(res.user)),
        tap((res) => this.user.next(res.user)),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  }

  register(formValues: FormValues): Observable<LoginResponse | undefined> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/register`, {
        ...formValues,
      })
      .pipe(
        tap((res) => console.log(res.user)),
        tap((res) => this.user.next(res.user)),
        catchError((error) => {
          console.log(error);
          return of(undefined);
        })
      );
  }

  logout() {
    this.user.next(undefined);
  }
}
