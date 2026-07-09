create table clientes(
  cod_cliente int generated always as identity primary key,
  -- generated always as identity = auto_increment 1234 sozinho
  nome varchar(200) not null,
  cpf varchar(14) unique not null,
  email varchar(100) not null,
  endereco varchar(200) not null
);

create table produtos(
  cod_produto int generated always as identity primary key,
  nome varchar(100) not null,
  preco_unitario decimal(10,2) not null,    
  personalizado boolean,
  modalidade varchar(50) not null,
  modelo varchar(50),
  cor varchar(30)
);

create table pedidos (
  id_pedido serial primary key,
  cod_cliente int references clientes(cod_cliente) on delete restrict,
  cod_produto int references produtos(cod_produto),
  data date default current_date,
  forma_pagamento varchar(50),
  total decimal(10,2) default 0.00
);

create table itens_pedido (
  id_item serial primary key,
  id_pedido int references pedidos(id_pedido) on delete cascade,
  produto_descricao text,
  quantidade int,
  preco_unitario decimal(10,2),
  subtotal decimal(10,2),
  personalizado boolean,
  nome_bordado varchar(50)
);
