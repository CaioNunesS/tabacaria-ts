# Tabacaria Online API

Bem-vindo ao repositório da Tabacaria Online API! Este projeto é o resultado do meu aprendizado em NodeJS e TypeScript, combinando a prática de desenvolvimento de uma API com a aplicação de conceitos avançados. Aqui estão as informações essenciais para começar:

##REQUISITOS:
Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

Docker Desktop 4.26.1
NodeJS versão 16.16

##RECURSOS
**NodeJS** com **TypeScript**: Aproveitando o poder do TypeScript para um código mais robusto e fácil de manter.
**Framework Express**: Utilizando o framework Express para construir APIs escaláveis e eficientes.
**Segurança JWT**: Implementando JSON Web Tokens (JWT) para medidas de segurança aprimoradas.
**Login com Google**: Permitindo autenticação do usuário por meio do Google para uma experiência de login sem problemas.
**Testes Unitários com Vitest**: Garantindo qualidade e confiabilidade por meio de testes unitários com Vitest.

##COMO USAR:
Siga estes passos simples para configurar e executar o projeto localmente:

1- Clonar o Repositório:
git clone https://github.com/CaioNunesS/tabacaria-ts.git

2- Iniciar o Projeto na IDE de Preferência:
Abra o projeto na sua IDE favorita.

3- Instalar Pacotes:
Execute o seguinte comando para instalar as dependências do projeto:

npm i

4- Iniciar o Container no Docker:
Utilize o Docker Compose para iniciar o container:

docker-compose up -d

5- Gerar Banco de Dados:
Execute o seguinte comando para popular o banco de dados com as tabelas criadas:

npx prisma generate dev

6- Criar Arquivo .env:
Crie um arquivo .env na raiz do projeto usando como base o .env.example fornecido.

7- Iniciar o Projeto:
Finalmente, inicie o projeto com o seguinte comando:

npm run dev

Com esses passos, a Tabacaria Online API estará pronta para uso localmente. Fique à vontade para explorar, contribuir e aprimorar o projeto conforme necessário.

Divirta-se codificando! 🚀



