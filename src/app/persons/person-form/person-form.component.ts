import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { PersonsService } from './../services/persons.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  form: FormGroup;

  codigo: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private service: PersonsService,
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      codigo: [null],
      nome: [null],
      cpf: [null],
      dataNascimento: [null]
    });
  }

  ngOnInit(): void {
    console.log();
    console.log(this.route.snapshot.paramMap.get('codigo'));

    this.codigo = Number(this.route.snapshot.paramMap.get('codigo'));
    this.form.patchValue({codigo: this.codigo});

    if(this.location.path().includes('update')){
      this.onfindById()
    }
  }

  onfindById() {
    this.service.findById(this.codigo).subscribe( response => {
      this.form.setValue({
        codigo: response.codigo,
        nome: response.nome,
        cpf: response.cpf,
        dataNascimento: response.dataNascimento
      });
    })
  }

  onSubmit(){

    if(this.location.path().includes('update')) {
      this.service.update(this.form.value)
      .subscribe(
        response => {
          this.onSuccess();
        },
        error => {
          this.onError();
        });
    } else {
      this.service.create(this.form.value)
      .subscribe(
        response => {
          this.onSuccess();
        },
        error => {
          this.onError();
        });
    }
  }

  onCancel(){
    this.location.back();
  }

  onSuccess() {
    this.snackBar.open('Registro inserido com sucesso', '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['accept-snackbar']
    });
    this.onCancel();
  }

  onError() {
    this.snackBar.open('Erro ao inserir Registro', '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }


}
