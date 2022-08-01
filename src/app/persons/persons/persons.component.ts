import { PersonsService } from './../services/persons.service';
import { Person } from './../model/person';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  persons$: Observable<Person[]>;
  displayedColumns: string[] = ['nome', 'cpf', 'dataNascimento']

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private personsService: PersonsService, private _snackBar: MatSnackBar) {
    this.persons$ = this.personsService.findAll()
    .pipe(
      catchError(error => {
        this._snackBar.open('Erro ao comunicar com servidor', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000
        });
        return of([]);
      })
      );
  }

  ngOnInit(): void {
  }

}
