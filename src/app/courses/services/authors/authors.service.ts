import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Person } from '../../../shared/person.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
  ) {}

  public loadAuthors(textFragment: string): Observable<Person[]> {
    const textSearch = textFragment ? `?q=${textFragment}` : '';
    return this.http.get<Person[]>(`${this.baseUrl}/authors` + textSearch);
  }
}
