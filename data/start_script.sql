## -------------------------------------------
## Script para inicialização do Banco de Dados
## -------------------------------------------

create database comunicacao;

# Achar o comando para usar o banco criado...
 
create schema pl_comunicacao;

# Achar o comando para usar o schema...

create table comunicacao (
   id serial primary key,
   tipo varchar(100),
   destinatario varchar(100),
   data varchar(20),
   hora varchar(20),
   mensagem text,
   status_mensagem varchar(50)
);
