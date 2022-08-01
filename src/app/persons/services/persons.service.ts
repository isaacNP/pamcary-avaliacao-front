import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs';

import { Person } from './../model/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private readonly API = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Person[]>(this.API.concat('findAll?page=0&size=10'))
    .pipe(
      first(),
      map((res: any) => {
        return res['content']
      })
    );
  }

  create(record: Person) {
    return this.httpClient.post<Person>(this.API.concat('create'), record).pipe(first());
  }

  update(record: Person) {
    return this.httpClient.put<Person>(this.API.concat('update'), record).pipe(first());
  }

  findById(codigo: number) {
    const url = this.API.concat('findById/') + codigo;
    return this.httpClient.get<Person>(url);
  }

  delete(codigo: number) {
    const url = this.API.concat('deleteById/') + codigo;
    return this.httpClient.delete(url);
  }
}
