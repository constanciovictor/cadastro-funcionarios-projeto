import { EditFuncionariosComponent } from './edit-funcionarios/edit-funcionarios.component';
import { AddFuncionariosComponent } from './add-funcionarios/add-funcionarios.component';
import { ListFuncionariosComponent } from './list-funcionarios/list-funcionarios.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'add-funcionarios', component: AddFuncionariosComponent },
  { path: 'list-funcionarios', component: ListFuncionariosComponent },
  { path: 'edit-funcionarios', component: EditFuncionariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
