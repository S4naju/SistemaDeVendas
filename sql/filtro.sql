--1  que envolva mais de uma tabela e que necessite retornar dados agregados, agrupados e com grupo por filtros.

-- clientes q ja gastaram mais de 140 reais em pedidos
select c.nome, COUNT(p.id_pedido) as quantidade_pedidos, SUM(p.total) as total_gasto from clientes c inner join pedidos p
    on c.cod_cliente = p.cod_cliente group by  c.cod_cliente, c.nome having SUM(p.total) > 140;
