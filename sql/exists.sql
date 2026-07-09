-- 1 Subconsulta que envolva o uso do EXISTS.

-- seleciona os clientes q possuem pelo menus um pedidos
select c.cod_cliente, c.nome from clientes c where EXISTS (select 1 from pedidos p where p.cod_cliente = c.cod_cliente);
