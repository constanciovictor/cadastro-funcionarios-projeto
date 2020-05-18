USE [master]
GO

/****** Object:  Table [dbo].[Funcionario_Habilidade]    Script Date: 5/17/2020 4:16:15 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Funcionario_Habilidade](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdFuncionario] [int] NULL,
	[IdHabilidade] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Funcionario_Habilidade]  WITH CHECK ADD FOREIGN KEY([IdFuncionario])
REFERENCES [dbo].[Funcionario] ([Id])
GO

ALTER TABLE [dbo].[Funcionario_Habilidade]  WITH CHECK ADD FOREIGN KEY([IdHabilidade])
REFERENCES [dbo].[Habilidade] ([Id])
GO


