create database estoque;

create table materiais(
 codigo int  PRIMARY KEY NOT NULL AUTO_INCREMENT,
descricao varchar(50),
quantidade varchar(10),
valor varchar (10),
peso varchar (10),
medida varchar(100),
endereco varchar (20)
);
select*from materiais;

describe materiais;

