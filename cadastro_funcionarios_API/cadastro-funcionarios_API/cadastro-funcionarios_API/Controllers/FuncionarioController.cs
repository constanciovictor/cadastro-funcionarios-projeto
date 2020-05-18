using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cadastro_funcionarios_API.Model;
using cadastro_funcionarios_API.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cadastro_funcionarios_API.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("MyPolicy")]
    public class FuncionarioController : Controller
    {
        private readonly IFuncionarioRepository<Funcionario> _funcionarioRepository;

        public FuncionarioController(IFuncionarioRepository<Funcionario> funcionarioRepository)
        {
            _funcionarioRepository = funcionarioRepository;
        }

        // GET: api/<Funcionario>
        [HttpGet]
        public async Task<IEnumerable<Funcionario>> ListaFuncionarios(string idade, string sexo, string habilidades, string nome)
        {
            var funcionarios = await _funcionarioRepository.Lista(idade, sexo, habilidades, nome);


            return funcionarios;
        }

        // GET api/<Funcionario>/5
        [HttpGet("{id}")]
        public async Task<Funcionario> ListaFuncionarioPorCodigo(int id)
        {
            var funcionario = await _funcionarioRepository.ListaPorCodigo(id);

            return funcionario;
        }

        // POST api/<Funcionario>
        [HttpPost]
        public int Adicionar([FromBody]Funcionario funcionario)
        {
            if (funcionario != null)
            {
                var id = _funcionarioRepository.Adiciona(funcionario);

                return id;
            }
            else
                return -1;
        }

        // PUT api/<Funcionario>/5
        [HttpPut("{id}")]
        public int Editar(int id, [FromBody]Funcionario funcionario)
        {
            if (funcionario != null)
            {
                var codigo = _funcionarioRepository.Edita(id, funcionario);

                return codigo;
            }
            else
                return -1;
        }

        [HttpPut]
        [Route("{id}/{status}")]
        public int AtivarDesativarFuncionario(int id, int status)
        {
            if (id > 0)
            {
                var codigo = _funcionarioRepository.AtivaDesativaFuncionaario(id, status);

                return codigo;
            }
            else
                return -1;
        }

    }
}