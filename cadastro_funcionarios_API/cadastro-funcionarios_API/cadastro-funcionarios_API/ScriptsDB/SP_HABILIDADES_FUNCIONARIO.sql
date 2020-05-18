CREATE PROCEDURE SP_HABILIDADES_FUNCIONARIO
	@IdFuncionario int   
AS
    
    SELECT 
		H.Id, 
		H.Nome 
	FROM Habilidade h
	INNER JOIN Funcionario_Habilidade fh on fh.IdHabilidade = h.Id
    WHERE 
		fh.IdFuncionario = @IdFuncionario	
GO