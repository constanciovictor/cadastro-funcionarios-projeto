using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace cadastro_funcionarios_API.Model
{
    public class Funcionario
    {
        [Key]
        public int? id { get; set; }

        public string nome { get; set; }

        public DateTime dtNascimento { get; set; }

        public string email { get; set; }

        public int sexo { get; set; }

        public int idade { get; set; }    

        public List<Habilidade> habilidades { get; set; }

        public int status { get; set; }
    }
}
