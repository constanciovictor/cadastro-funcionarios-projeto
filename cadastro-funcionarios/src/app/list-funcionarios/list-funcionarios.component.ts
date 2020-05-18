import { Funcionario } from './../model/funcionario.model';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-list-funcionarios',
  templateUrl: './list-funcionarios.component.html',
  styleUrls: ['./list-funcionarios.component.css']
})
export class ListFuncionariosComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  addForm: FormGroup;
  dropdownList = [];
  listFuncionarios: Funcionario[];
  selectedItems = [];
  dropdownSettings = {};
  status: number;

  ngOnInit(): void {

    this.dropdownList = [
      { item_id: 1, item_text: 'C#' },
      { item_id: 2, item_text: 'Java' },
      { item_id: 3, item_text: 'Angular' },
      { item_id: 4, item_text: 'SQL' },
      { item_id: 5, item_text: 'ASP' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5
  };

  this.addForm = this.formBuilder.group({
    id: [''],
    idade: ['', Validators.required],
    sexo: ['', Validators.required],
    habilidades: ['', Validators.required],
    nome: ['', Validators.required]
  });

  debugger;
  this.apiService.listaFuncionarios(this.addForm.controls['idade'].value, this.addForm.controls['sexo'].value, this.addForm.controls['habilidades'].value, this.addForm.controls['nome'].value)
    .subscribe( data => { 
      this.listFuncionarios = data;   

          this.listFuncionarios.forEach(obj => {
            obj.habilidades.forEach(childObj=> {
              obj.habilidadesConcat = obj.habilidadesConcat == undefined ? '' + childObj.nome : obj.habilidadesConcat + '/' + childObj.nome;
          });
        });

    });
  }

  editFuncionario(func: Funcionario): void {
    console.log(func)
    window.localStorage.removeItem("funcId");
    window.localStorage.setItem("funcId", func.id.toString());
    this.router.navigate(['edit-funcionarios']);
  };

  ativarDesativarFuncionario(func: Funcionario): void {
    
    if (func.status = 1) {
      this.status = 0
    }else { this.status = 1 }

    this.apiService.ativarDesativarFuncionario(func.id, this.status)
    .subscribe( data => {
       if (data > 0)
       {
         alert('Status alterado com sucesso!');
       }

       this.router.navigate(['list-funcionarios']);
    });
  };

  onSubmit() {
      this.apiService.listaFuncionarios(this.addForm.controls['idade'].value, this.addForm.controls['sexo'].value, this.addForm.controls['habilidades'].value, this.addForm.controls['nome'].value)
      .subscribe( data => {
          this.listFuncionarios = data;
      });
  }

}
