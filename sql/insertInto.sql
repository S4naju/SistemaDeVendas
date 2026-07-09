-- inserir 5 registros em todas a tabelas
insert into clientes (nome, cpf, email, endereco)
  values('Naju Sampaio', '000.000.007-70', 'sampaio.anajuju@gmail.com', 'Rua Alemanha...'),
  ('Oscar Piastri', '089.000.057-80', 'oscarpiastri@gmail.com', 'Rua Nóbrega...'),
  ('Beatriz Souza', '037.020.008-88', 'beatrizsjudo@gmail.com', 'Rua Fernão Dias...'),
  ('Mica Galvão', '980.020.018-00', 'galvaomica@uol.com.br', 'Rua Nove...'),
  ('Melissa Cardoso', '813.789.008-09', 'cardosomel@hotmail.com.br', 'Rua José Estanislau...');

insert into produtos (nome, modelo, modalidade, cor, personalizado, preco_unitario)
  values('Belt OX Standard 6 Costuras', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Branca', false, 50.00),
  ('Belt OX Standard 6 Costuras', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Cinza', false, 50.00 ),
  ('Belt OX Standard 6 Costuras', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Azul', false, 50.00 ),
  ('Belt OX Standard 6 Costuras', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Amarela', false, 50.00),
  ('Belt OX Standard 6 Costuras', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Laranja', false, 50.00),
  ('Belt OX Standard 6 Costuras', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Verde', false, 50.00),
  ('Belt OX Standard 6 Costuras', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Roxa', false, 50.00),
  ('Belt OX Standard 6 Costuras', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Marrom', false, 50.00),
  ('Belt OX Standard 6 Costuras', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Preta', false, 50.00),
  ('Belt OX Standard 6 Costuras', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Vermelho', false, 50.00),

  ('Belt OX Standard 6 Costuras Personalizada', 'Standard 6 Costuras', 'Jiu-Jitsu', 'Variada', true, 75.00),
  ('Belt BR Premium 10 Costuras Personalizada', 'Premium 10 Costuras', 'Jiu-Jitsu', 'Variada', true, 175.00),
  ('Belt BR Pro 8 Costuras Personalizada', 'Pro 8 Costuras', 'Jiu-Jitsu', 'Variada', true, 135.00),

  ('Belt BR Standard 6 Costuras', 'Standard 6 Costuras', 'Judô', 'Branca', false, 60.00),
  ('Belt BR Standard 6 Costuras', 'Standard 6 Costuras', 'Judô', 'Cinza', false, 60.00),
  ('Belt BR Standard 6 Costuras', 'Standard 6 Costuras', 'Judô', 'Azul', false, 60.00),
  ('Belt BR Standard 6 Costuras', 'Standard 6 Costuras', 'Judô', 'Amarela', false, 60.00),
  ('Belt BR Standard 6 Costuras', 'Standard 6 Costuras', 'Judô', 'Laranja', false, 60.00),
  ('Belt BR Standard 6 Costuras', 'Standard 6 Costuras', 'Judô', 'Verde', false, 60.00),
  ('Belt BR Standard 6 Costuras', 'Standard 6 Costuras', 'Judô', 'Roxa', false, 60.00),
  ('Belt BR Standard 6 Costuras', 'Standard 6 Costuras', 'Judô', 'Marrom', false, 60.00),
  ('Belt BR Standard 6 Costuras', 'Standard 6 Costuras', 'Judô', 'Preta', false, 60.00),
  ('Belt BR Standard 6 Costuras', 'Standard 6 Costuras', 'Judô', 'Vermelho', false, 60.00),

  ('Belt BR Standard 6 Costuras Personalizada', 'Standard 6 Costuras', 'Judô', 'Variada', true, 85.00),
  ('Belt BR Premium 10 Costuras Personalizada', 'Premium 10 Costuras', 'Judô', 'Variada', true, 175.00),
  ('Belt BR Pro 8 Costuras Personalizada', 'Pro 8 Costuras', 'Judô', 'Variada', true, 135.00),

  ('Chaveiro Belt', NULL, 'Judô', 'Branca', false, 15.00),
  ('Chaveiro Belt', NULL, 'Judô', 'Cinza', false, 15.00),
  ('Chaveiro Belt', NULL, 'Judô', 'Azul', false, 15.00),
  ('Chaveiro Belt', NULL, 'Judô', 'Amarela', false, 15.00),
  ('Chaveiro Belt', NULL, 'Judô', 'Laranja', false, 15.00),
  ('Chaveiro Belt', NULL, 'Judô', 'Verde', false, 15.00),
  ('Chaveiro Belt', NULL, 'Judô', 'Roxa', false, 15.00),
  ('Chaveiro Belt', NULL, 'Judô', 'Marrom', false, 15.00),
  ('Chaveiro Belt', NULL, 'Judô', 'Preta', false, 15.00),
  ('Chaveiro Belt', NULL, 'Judô', 'Vermelho', false, 15.00),

  ('Chaveiro Belt', NULL, 'Jiu-Jitsu', 'Branca', false, 15.00),
  ('Chaveiro Belt', NULL, 'Jiu-Jitsu', 'Cinza', false, 15.00),
  ('Chaveiro Belt', NULL, 'Jiu-Jitsu', 'Azul', false, 15.00),
  ('Chaveiro Belt', NULL, 'Jiu-Jitsu', 'Roxa', false, 15.00),
  ('Chaveiro Belt', NULL, 'Jiu-Jitsu', 'Marrom', false, 15.00),
  ('Chaveiro Belt', NULL, 'Jiu-Jitsu', 'Preta', false, 15.00),
  ('Chaveiro Belt', NULL, 'Jiu-Jitsu', 'Vermelho', false, 15.00);

insert into pedidos(cod_cliente, data, forma_pagamento, total, cod_produto) 
  values(2, '2026-07-08', 'PIX', 15.00, 16),
  (2, '2026-07-08', 'PIX', 135.00),
  (4, '2026-07-08', 'Cartão de Crédito', 120.00),
  (6, '2026-07-08', 'Cartão de Crédito', 175.00),
  (7, '2026-07-08', 'Cartão de Débito', 30.00),
  (7, '2026-07-08', 'PIX', 15.00),
  (4, '2026-07-08', 'Cartão de Débito', 75.00);

insert into itens_pedido(produto_descricao, quantidade, preco_unitario, subtotal, personalizado, nome_bordado)
  values('Chaveiro Belt - Modalidade: Judô, Cor: Branca', 1, 15.00, FALSE, NULL),
  ('Faixa BELT BR PRO - Modalidade: Judô, Cor: Marrom', 1, 135.00, TRUE, 'naju'),
  ('Chaveiro Belt - Modalidade: Jiu-Jitsu, Cor: Amarela', 2, 15.00, FALSE, NULL),
  ('Faixa BELT BR PREMIUM - Modalidade: Jiu-Jitsu, Cor: Preta ', 1, 175.00, TRUE, 'mica'),
  ('Faixa BELT OX STANDARD - Modalidade: Judô, Cor: Azul', 1, 75.00, TRUE, 'piastri');
