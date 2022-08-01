import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Location } from '@angular/common';

import { Person } from './../model/person';
import { PersonsService } from './../services/persons.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  persons$: Observable<Person[]>;
  displayedColumns: string[] = ['nome', 'cpf', 'dataNascimento', 'acoes']

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private personsService: PersonsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private service: PersonsService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.persons$ = this.personsService.findAll()
    .pipe(
      catchError(error => {
        this.onError('Erro ao listar registros');
        return of([]);
      })
      );
  }

  ngOnInit(): void {
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onUpdate(codigo: number) {
    this.router.navigate(['update', codigo], {relativeTo: this.route});
  }

  onDelete(codigo: number) {
    this.service.delete(codigo).subscribe(response => { window.location.reload() }, error => { this.onError('Erro ao remover Registro')});
  }

  onError(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

}
