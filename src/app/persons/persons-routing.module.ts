import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonFormComponent } from './person-form/person-form.component';
import { PersonsComponent } from './persons/persons.component';

const routes: Routes = [
  { path: '', component: PersonsComponent },
  { path: 'new', component: PersonFormComponent },
  { path: 'update/:codigo', component: PersonFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
