import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-edit-funcionarios',
  templateUrl: './edit-funcionarios.component.html',
  styleUrls: ['./edit-funcionarios.component.css']
})
export class EditFuncionariosComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  editForm: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  loadContent: boolean = false;
  valido = true;
  dataNascimento: Date;

  ngOnInit(): void {

    this.dropdownList = [
      { id: 1, nome: 'C#' },
      { id: 2, nome: 'Java' },
      { id: 3, nome: 'Angular' },
      { id: 4, nome: 'SQL' },
      { id: 5, nome: 'ASP' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5
  };

  let funcId = window.localStorage.getItem("funcId");
  if(!funcId) {
    alert("Funcionário Inválido.")
    this.router.navigate(['list-funcionarios']);
    return;
  }

  this.editForm = this.formBuilder.group({
    id: [''],
    nome: ['', Validators.required],
    dtNascimento: ['', Validators.required],
    email: ['', Validators.required],
    sexo: ['', Validators.required],
    habilidades: ['', Validators.required],
    idade: ['', Validators.required],
    status: ['', Validators.required]
  });

  this.apiService.listaFuncionarioPorCodigo(+funcId)
    .subscribe( data => {
      this.editForm.setValue(data);    
      this.dataNascimento = data.dtNascimento;
    });
  }

  validaInformacoes() {
    
    if (this.editForm.controls['nome'].value == '')
    {
      alert('Nome é obrigatório.');
      return false;
    }

    if (this.editForm.controls['dtNascimento'].value == '')
    {
      alert('Data nascimento é obrigatório.');
      return false;
    }

    if (this.editForm.controls['email'].value != '')
    {
      if (!this.validMail(this.editForm.controls['email'].value))
      {
        alert('e-mail inválido.');
        return false;
      }
    }

    if (this.editForm.controls['sexo'].value == '' || this.editForm.controls['sexo'].value == '0')
    {
      alert('Sexo é obrigatório.');
      return false;
    }

    if (this.editForm.controls['habilidades'].value <= 0)
    {
      alert('Habilidade é obrigatório.');
      return false;
    }

    return true;

  }

  validMail(mail)
  {
      return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
  }

  onSubmit() {

    if (this.validaInformacoes())
    {
      this.apiService.editarFuncionario(this.editForm.value)
        .subscribe( data => {
          if (data > 0) {
            alert('Funcionário editado com sucesso!')
          }

          this.router.navigate(['list-funcionarios']);
        });
    }
  }

}
