# API REST para integração com API Conversora de Moedas

Essa é uma API RESTful escrita em NestJS que utiliza TypeORM e SQLite para registrar conversões cambiais feitas pelos usuários utilizando a API de terceiros https://apilayer.com/marketplace/exchangerates_data-api?utm_source=apilayermarketplace&utm_medium=featured. Com ela, é possível criar, atualizar, remover e listar os usuários e realizar requisições a uma API de terceiros para converter moedas, mantendo o registro dessas transações.

## Instalação

Antes de tudo, certifique-se de ter o Node.js e o npm instalados em sua máquina.

1. Clone o repositório para sua máquina:
`git clone https://ian_alves@bitbucket.org/recrutamento_jya_nodejs/recrutamento-conversor-nodejs-ian.santos.alves_hotmail.com.git `

2. Acesse a pasta da API:
`cd api-converter-moedas`

3. Instale as dependências:
`npm install`

4. acesse a pasta `src/utils` e modifique o atributo `keyvalue` do arquivo apikey.ts para chave da API de terceiros  

5. Inicie a aplicação:
`npm start`

6. Teste os endpoints com um client HTTP

## Uso

A API utiliza a porta 3000 por padrão. As rotas disponíveis são:

**Usuários:**

- **GET api/v1/users/**: Retorna uma lista com todos os usuários.
- **GET api/v1/users/:userId/**: Retorna as informações de um usuário.
- **POST api/v1/users/**: Cria um novo usuário.
- **PATCH api/v1/users/:userId/**: Atualiza as informações de um usuário.
- **DELETE api/v1/users/:userId/**: Remove as informações de um usuário.

**Transações:**

- **GET api/v1/transactions/**: Retorna uma lista com todas as transações realizadas.
- **GET api/v1/transactions/:transactionId/**: Retorna as informações de uma transação específica.
- **GET api/v1/transactions/user/:userId**: Retorna uma lista com todas as transações de um usuário.
- **GET api/v1/transactions/convert/:idUser/:to/:from/:amount**: Realiza a conversão cambial e registra a transação.
- **DELETE api/v1/transactions/:transactionId/**: Remove as informações de uma transação.

## Tecnologias utilizadas

- Typescript: Requisito do projeto.
- NestJS: Framework JavaScript construído com base no Express tendo, assim, diversas funcionalidades já inclusas. Escolhido para acelerar o desenvolvimento do projeto.
- TypeORM: ORM de preferência do Nest. Simplifica o gerenciamento do Banco de Dados.
- SQLite: Banco embedded leve e que não precisa de muitas configurações. Se integra bem com o Nest e o TypeORM.

## Organização das camadas

- Segue o padrão de arquitetura do Nest: classes Entity para mapear as tabelas SQL, classes service para aplicação das regras de negócio e interação com a API Repository do TypeORM e classes controller para gerenciar os endpoints e utilizar os métodos corretos do service. 
- Além disso, temos classes modules para gerenciamento dos módulos.
- Em utils, temos arquivos para auxiliar os métodos das outras classes (objeto apikey para guardar as credenciais da API terceira e classe Conversion para lidar com a resposta da classe terceira).