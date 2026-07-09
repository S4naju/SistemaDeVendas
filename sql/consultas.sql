--consulta de produtos nunca comprados
create or replace view produtos_nunca_comprados as select cod_produto, nome, preco_unitario, categoria from produtos where cod_produto not in (
    select distinct cod_produto from itens_pedido);
    
