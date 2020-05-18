using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace cadastro_funcionarios_API.Repository
{
    public interface IFuncionarioRepository<Funcionario>
    {
        IDbConnection GetOpenConnection();
        Task<IEnumerable<Funcionario>> Lista(string idade, string sexo, string habilidades, string nome);
        Task<Funcionario> ListaPorCodigo(int id);
        int Adiciona(Funcionario funcionario);
        int Edita(int id, Funcionario funcionario);
        int AtivaDesativaFuncionaario(int id, int status);
    }
}
