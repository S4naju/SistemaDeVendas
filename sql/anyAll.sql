--1 Subconsulta que use operadores de comparação ANY OU ALL

-- pedido com total maior q todos os pedidos de um cliente específico
select id_pedido, total from pedidos where total> ALL (select total from pedidos where cod_cliente = 7);
