import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material.module';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsComponent } from './persons/persons.component';

@NgModule({
  declarations: [
    PersonsComponent,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class PersonsModule { }
