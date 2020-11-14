# Plataforma de Comunicação

Esse projeto tem como objetivo o agendamento de comunicação paro o envio de mensagens em diferente sistemas de comunicação.

## Tecnologias Utilizadas
* PostgreSQL
* Node.js
* React

## Instalação

### 1. Banco de dados: 

* Na pasta `data` usar o arquivo "start_script.sql" para criar a tabela do banco.
* `Se possui Docker instalado na máquina, o arquivo "docker-compose" sube o PostgreSQL em uma instância Docker, para isso basta rodar o comando "docker-compose up" dentro dessa pasta!`

### 2. Aplicação Server (API): 
* Na pasta `server` rodar os seguinte comandos no terminal:
```shell script
npm ou yarn install
npm ou yarn start
```
O servidor da aplicação estará rodando na porta `**4050**`.

### 3. Aplicação client Web: 
* Na pasta `client` rodar os seguinte comandos no terminal:
```shell script
npm ou yarn install
npm ou yarn start
```
O client web da aplicação estará rodando na porta `**3000**`.

## Uso

1. Para ter acesso a aplicação web basta acessar o caminho `localhost:3000` no seu navegador.
2. Na aba `Agendamento` será listado o status de cada agendamento.
3. O cabeçalho da aba `Agendamento` possui 3 ícones responssáveis por adicionar, editar e excluir um agendamento. 

## License
O projeto está licenciado sob a licença GNU GPLv2.

**Third Party Licences**
  * primereact: © PrimeReact - MIT Licence (https://github.com/primefaces/primereact/blob/master/LICENSE.md)

