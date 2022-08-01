import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsComponent } from './persons/persons.component';

import { AppMaterialModule } from '../shared/app-material/app-material.module';

@NgModule({
  declarations: [
    PersonsComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    AppMaterialModule
  ]
})
export class PersonsModule { }
