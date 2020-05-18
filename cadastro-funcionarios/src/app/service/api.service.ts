import { Habilidades } from './../model/habilidades.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Funcionario} from "../model/funcionario.model";
import {Observable} from "rxjs/index";
import {ApiResponse} from "../model/api.response";

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://localhost:44367/api/funcionario/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  listaFuncionarios(idade: number, sexo: number, habilidades: [], nome: string) : Observable<Funcionario[]> {
  debugger;
  let ids: string;

    let params = new HttpParams();
    
    params = params.append('idade', idade.toString());
    params = params.append('sexo', sexo.toString());

    if (habilidades.length == 0) {
      params = params.append('habilidades', '');
    }
    else {
      params = params.append('habilidades', JSON.stringify(habilidades));
    };

    params = params.append('nome', nome.toString());

    return this.http.get<Funcionario[]>(this.baseUrl, { params: params} );
  }

  listaFuncionarioPorCodigo(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(this.baseUrl + id);
  }

  adicionarFuncionario(func: Funcionario): Observable<number> { 
    debugger;   
    return this.http.post<number>(this.baseUrl, JSON.stringify(func), this.httpOptions);
  }

  editarFuncionario(func: Funcionario): Observable<number> {
    debugger;
    return this.http.put<number>(this.baseUrl + func.id, JSON.stringify(func), this.httpOptions);
  }

  ativarDesativarFuncionario(id: number, status: number): Observable<number> {
    return this.http.put<number>(this.baseUrl + id + '/' + status, null);
  }
}
