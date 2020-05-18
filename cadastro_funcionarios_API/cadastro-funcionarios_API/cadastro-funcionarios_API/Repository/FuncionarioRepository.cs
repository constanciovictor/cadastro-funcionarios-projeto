using cadastro_funcionarios_API.Model;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace cadastro_funcionarios_API.Repository
{
    public class FuncionarioRepository : IFuncionarioRepository<Funcionario>
    {
        private string connectionString;

        public FuncionarioRepository()
        {
            connectionString = @"Server=localhost;Database=master;Trusted_Connection=True;";
        }

        public IDbConnection Connection
        {
            get
            {
                return new SqlConnection(connectionString);
            }
        }

        async Task<IEnumerable<Funcionario>> IFuncionarioRepository<Funcionario>.Lista(string idade, string sexo, string habilidades, string nome)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = "SP_LISTAR_FUNCIONARIOS";

                var p = new DynamicParameters();
                p.Add("@Id", DBNull.Value, dbType: DbType.Int32);
                p.Add("@Idade", Convert.ToInt32(idade), dbType: DbType.Int32);
                p.Add("@Sexo", Convert.ToInt32(sexo), dbType: DbType.Int32);
                p.Add("@Nome", nome, dbType: DbType.String);
                p.Add("@Habilidades", habilidades, dbType: DbType.String);

                dbConnection.Open();

                var funcionarios = await dbConnection.QueryAsync<Funcionario>(sQuery, p, commandType: CommandType.StoredProcedure);

                if (funcionarios.ToList().Count > 0)
                {
                    foreach (var item in funcionarios)
                    {
                        sQuery = "SP_HABILIDADES_FUNCIONARIO";

                        p = new DynamicParameters();
                        p.Add("@IdFuncionario", item.id, dbType: DbType.Int32);

                        item.habilidades = dbConnection.Query<Habilidade>(sQuery, p, commandType: CommandType.StoredProcedure).ToList();
                    }
                }

                dbConnection.Close();

                return funcionarios;
            }
        }
      

        public int Adiciona(Funcionario funcionario)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"INSERT INTO [dbo].[Funcionario]
                                   (Nome
                                   ,DtNascimento
                                   ,Email
                                   ,Idade
                                   ,status
                                   ,sexo)
                                 VALUES
                                   (@nome
                                   ,@dtNascimento
                                   ,@email
                                   ,DATEDIFF(YY, @dtNascimento, GETDATE())
                                   ,1
                                   ,@sexo)

                                SELECT CAST(SCOPE_IDENTITY() as int)";

                dbConnection.Open();

                var id = dbConnection.Query<int>(sQuery, new { nome = funcionario.nome, email = funcionario.email, idade = funcionario.idade, sexo = funcionario.sexo, dtNascimento = funcionario.dtNascimento }).Single();

                if (id > 0)
                {
                    foreach (var item in funcionario.habilidades)
                    {
                        sQuery = @"INSERT INTO [dbo].[Funcionario_Habilidade]
                                   (IdFuncionario
                                   ,IdHabilidade)
                                 VALUES
                                   (" + id + "" +
                                    "," + item.id + ")";
    
                        dbConnection.Execute(sQuery);
                    }
                }

                dbConnection.Close();

                return id;
            }
        }

        int IFuncionarioRepository<Funcionario>.AtivaDesativaFuncionaario(int id, int status)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"UPDATE [dbo].[Funcionario]
                                  SET status = " + status +
                                  " WHERE Id =" + id;

                dbConnection.Open();
                dbConnection.Execute(sQuery);
                dbConnection.Close();

                return 1;
            }
        }

        int IFuncionarioRepository<Funcionario>.Edita(int id, Funcionario funcionario)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = @"UPDATE [dbo].[Funcionario]
                                  SET NOME = @nome
                                     ,DtNascimento = @dtNascimento
                                     ,Email = @email
                                     ,Idade = @idade
                                     ,Sexo = @sexo
                                  WHERE
                                      Id = " + id;

                dbConnection.Open();

                dbConnection.Execute(sQuery, funcionario);

                if (id > 0)
                {
                    sQuery = @"DELETE FROM [dbo].[Funcionario_Habilidade] WHERE IDFUNCIONARIO = " + id;

                    dbConnection.Execute(sQuery);

                    foreach (var item in funcionario.habilidades)
                    {
                        sQuery = @"INSERT INTO [dbo].[Funcionario_Habilidade]
                                   (IdFuncionario
                                   ,IdHabilidade)
                                 VALUES
                                   (" + id + "" +
                                    "," + item.id + ")";

                        dbConnection.Execute(sQuery);
                    }
                }

                dbConnection.Close();

                return 1;
            }
        }

        IDbConnection IFuncionarioRepository<Funcionario>.GetOpenConnection()
        {
            throw new NotImplementedException();
        }

        public async Task<Funcionario> ListaPorCodigo(int id)
        {
            using (IDbConnection dbConnection = Connection)
            {
                string sQuery = "SP_LISTAR_FUNCIONARIOS";

                var p = new DynamicParameters();
                p.Add("@Id", Convert.ToInt32(id), dbType: DbType.Int32);
                p.Add("@Idade", 0, dbType: DbType.Int32);
                p.Add("@Sexo", 0, dbType: DbType.Int32);
                p.Add("@Nome", DBNull.Value, dbType: DbType.String);

                dbConnection.Open();

                var func = await dbConnection.QueryFirstAsync<Funcionario>(sQuery, p, commandType: CommandType.StoredProcedure);

                if (func != null)
                {
                    sQuery = "SP_HABILIDADES_FUNCIONARIO";

                    p = new DynamicParameters();
                    p.Add("@IdFuncionario", func.id, dbType: DbType.Int32);

                    func.habilidades = dbConnection.Query<Habilidade>(sQuery, p, commandType: CommandType.StoredProcedure).ToList();
                }

                dbConnection.Close();

                return func;
            }
        }
    }
}
