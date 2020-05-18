import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFuncionariosComponent } from './add-funcionarios/add-funcionarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ApiService} from "./service/api.service";
import {HttpClientModule} from "@angular/common/http";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ListFuncionariosComponent } from './list-funcionarios/list-funcionarios.component';
import { EditFuncionariosComponent } from './edit-funcionarios/edit-funcionarios.component';

@NgModule({
  declarations: [
    AppComponent,
    AddFuncionariosComponent,
    ListFuncionariosComponent,
    EditFuncionariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
