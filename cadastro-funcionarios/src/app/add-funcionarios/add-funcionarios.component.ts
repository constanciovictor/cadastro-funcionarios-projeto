import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-add-funcionarios',
  templateUrl: './add-funcionarios.component.html',
  styleUrls: ['./add-funcionarios.component.css']
})
export class AddFuncionariosComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) { }

  addForm: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  loadContent: boolean = false;
  valido = true;

  ngOnInit() {
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

    this.addForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      dtNascimento: ['', Validators.required],
      email: ['', Validators.required],
      sexo: ['', Validators.required],
      habilidades: ['', Validators.required]
    });

  }

  validaInformacoes() {
    
    if (this.addForm.controls['nome'].value == '')
    {
      alert('Nome é obrigatório.');
      return false;
    }

    if (this.addForm.controls['dtNascimento'].value == '')
    {
      alert('Data nascimento é obrigatório.');
      return false;
    }

    if (this.addForm.controls['email'].value != '')
    {
      if (!this.validMail(this.addForm.controls['email'].value))
      {
        alert('e-mail inválido.');
        return false;
      }
    }

    if (this.addForm.controls['sexo'].value == '' || this.addForm.controls['sexo'].value == '0')
    {
      alert('Sexo é obrigatório.');
      return false;
    }

    if (this.addForm.controls['habilidades'].value <= 0)
    {
      alert('Habilidade é obrigatório.');
      return false;
    }

    if (this.ageFromDateOfBirthday(this.addForm.controls['dtNascimento'].value) < 18)
    {
      alert('Funcionário não completou 18 anos.');
      return false;
    }

    return true;

  }

  validMail(mail)
  {
      return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
  }

  ageFromDateOfBirthday(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  onSubmit() {

    if (this.validaInformacoes())
    {
      this.apiService.adicionarFuncionario(this.addForm.value)
        .subscribe( data => {
          console.log(data)
          if (data > 0) {
            alert('Funcionário cadastrado com sucesso!')
          }
          
          this.router.navigate(['list-funcionarios']);
        });
    }
  }

}
