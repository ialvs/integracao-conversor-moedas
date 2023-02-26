# Conversor de moedas

Você deverá implementar uma API Rest que seja capaz de realizar a conversão entre duas moedas
utilizando taxas de conversões atualizadas de um serviço externo.

Para realização da conversão é necessário o ID do usuário que deseja realizar a conversão.

A API deverá registrar cada transação de conversão com todas as informações relacionadas e também
disponibilizar um endpoint para consulta das transações realizadas por um usuário.

O projeto deverá ser feito em Node.js com TypeScript.

1. Deve ser possível realizar a conversão entre 4 moedas no mínimo (BRL, USD, EUR, JPY); <span style="color: #00ff00">&#10003;</span>
1. As taxas de conversão devem ser obtidas de https://api.exchangeratesapi.io/latest?base=EUR 
  (Usar a API Free - Tem limitação de requisições, e apenas conversão com base na moeda EUR); <span style="color: #00ff00">&#10003;</span>
1. As transações de conversão devem ser persistidas no banco de dados (embedded) contendo: <span style="color: #00ff00">&#10003;</span>

    * ID do usuário;
    * Moeda origem;
    * Valor origem;
    * Moeda destino;
    * Taxa de conversão utilizada;
    * Data/Hora UTC;

1. Uma transação com sucesso deve retornar: <span style="color: #00ff00">&#10003;</span>
    * ID da transação
    * ID do usuário;
    * Moeda origem;
    * Valor origem;
    * Moeda destino;
    * Valor destino;
    * Taxa de conversão utilizada;
    * Data/Hora UTC;

1. Os casos de falha devem retornar com status code pertinente e descrição no corpo; <span style="color: #00ff00">&#10003;</span>
1. Deverá existir um endpoint para listagem de todas as transações realizadas por usuário; <span style="color: #00ff00">&#10003;</span>

1. Deve haver uma cobertura satisfatória de testes;

1. Deve-se adicionar a esse arquivo explicações sobre como rodar a aplicação, e uma apresentação sobre o
projeto: propósito, features, motivação das principais escolhas de tecnologias, e separação das camadas;

1. Todo o código deve ser em inglês; <span style="color: #00ff00">&#10003;</span>

1. Disponibilizar o código apenas nesse repositório, sem nenhuma cópia pública, para evitar plágio; <span style="color: #00ff00">&#10003;</span>

## Itens desejáveis
* Logs
* Tratamento de exceções
* Documentação
* Coesão de commits 
* Mensagens de commits claras <span style="color: #00ff00">&#10003;</span>
* Configuração de lint <span style="color: #00ff00">&#10003;</span>
* Testes unitários
* Testes de integração
* Documentação dos endpoints
* Estar rodando e disponível (Ex: Heroku, ou similar)
* CI/CD
