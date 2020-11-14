# Plataforma de Comunicação

Este projeto tem como objetivo o agendamento de envio de mensagens em diferente sistemas/plataformas de comunicação.

## Tecnologias Utilizadas
* PostgreSQL
* Node.js
* React

## Instalação

### 1. Banco de dados: 

* Na pasta `data` o arquivo "start_script.sql" possui os comandos para criação do banco e da tabela.
* Caso possua o Docker instalado, o arquivo `docker-compose"` sobe o PostgreSQL em uma instância Docker. Para isso basta rodar o comando `docker-compose up` dentro dessa pasta.

### 2. Aplicação Server (API): 
* Na pasta `server` rodar os seguintes comandos no terminal:
```shell script
npm ou yarn install
npm ou yarn start
```
O server estará rodando na porta `4050`.

### 3. Aplicação client Web: 
* Na pasta `client` rodar os seguintes comandos no terminal:
```shell script
npm ou yarn install
npm ou yarn start
```
O client web da aplicação estará rodando na porta `3000`.

## Uso

1. Para ter acesso a aplicação web basta acessar o caminho `localhost:3000` no seu navegador.
2. Na aba `Agendamento` será listado o status de cada agendamento.
3. No cabeçalho há 3 ícones responsáveis por adicionar, editar e excluir um agendamento. 

## License
O projeto está licenciado sob a licença GNU GPLv2.

**Third Party Licences**
  * primereact: © PrimeReact - MIT Licence (https://github.com/primefaces/primereact/blob/master/LICENSE.md)

