CREATE PROCEDURE SP_LISTAR_FUNCIONARIOS
	@Id int = null,
    @Idade int = 0,
	@Sexo int = 0,
    @Nome varchar(200) = null,
	@Habilidades varchar(20) = null
AS
    
    SELECT F.Id, F.Nome, F.DtNascimento, F.Email, F.Idade, F.status, F.sexo 
	FROM Funcionario F
	INNER JOIN Funcionario_Habilidade fh on F.Id = fh.IdFuncionario
    WHERE (@Id IS NULL OR F.Id = @Id) and
		  (@Idade = 0 OR F.Idade = @Idade) and
		  (@Sexo = 0 OR F.Sexo = @Sexo) and
		  (@Nome IS NULL OR F.Nome = @Nome) and
		  (@Habilidades IS NULL OR fh.IdHabilidade in (@Habilidades))
GO