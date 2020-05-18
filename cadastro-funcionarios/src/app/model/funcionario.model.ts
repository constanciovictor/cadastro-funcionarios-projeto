import { Habilidades } from './../model/habilidades.model';

export class Funcionario {

    id: number;
    nome: string;
    dtNascimento: Date;
    email: string;
    sexo: number;
    idade: number;
    habilidades: Habilidades[];
    status: number;
    habilidadesConcat: string;
  }
  