import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs';

import { Person } from './../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private readonly API = 'http://localhost:8080/findAll?page=0&size=10';

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Person[]>(this.API)
    .pipe(
      first(),
      map((res: any) => {
        return res['content']
      })
    );
  }
}
