# Sistema de Controle de Vendas - Sense Belts

### Sobre o projeto:
Este projeto foi desenvolvido como parte da disciplina **Banco de Dados I** no IFRJ - Niterói, com o objetivo de aplicar na prática os conceitos de modelagem, criação e manipulação de um banco de dados relacional integrado a uma aplicação web.

O sistema foi desenvolvido para a empresa **Sense Belts**, com a finalidade de gerenciar informações relacionadas aos produtos, clientes e vendas realizadas. A aplicação permite realizar operações de cadastro, consulta, atualização e exclusão de dados, utilizando um banco de dados PostgreSQL hospedado no Supabase.

---

### Estrutura do sistema:

O banco de dados foi desenvolvido utilizando as seguintes tabelas:

1. **Clientes**  
   Armazena as informações dos clientes cadastrados no sistema.
   **Campos principais:**
   - Código do cliente
   - Nome
   - CPF
   - E-mail
   - Endereço

2. **Produtos**  
   Armazena os produtos disponíveis para venda, como faixas de Jiu-Jitsu, Judô e chaveiros personalizados.
   **Campos principais:**
   - Código do produto
   - Nome
   - Modelo
   - Modalidade
   - Cor
   - Preço unitário
   - Personalização

3. **Pedidos**  
   Registra as vendas realizadas pelos clientes.
   **Campos principais:**
   - Código do pedido
   - Cliente relacionado
   - Produto relacionado
   - Data do pedido
   - Forma de pagamento
   - Valor total

4. **Itens do Pedido**  
   Armazena os detalhes dos produtos presentes em cada pedido.
   **Campos principais:**
   - Código do item
   - Pedido relacionado
   - Descrição do produto
   - Quantidade
   - Preço unitário
   - Subtotal
   - Nome do bordado

---

### Funcionalidades:

O sistema possui operações CRUD completas, permitindo:

- Cadastrar clientes, produtos e pedidos
- Listar informações cadastradas
- Editar registros existentes
- Excluir registros
- Consultar dados utilizando filtros
- Realizar consultas envolvendo relacionamento entre tabelas
- Executar subconsultas utilizando IN, NOT IN, ANY, ALL e EXISTS

---

### Tecnologias utilizadas:

**Front-end:**
- HTML5
- CSS3
- JavaScript

**Banco de Dados:**
- PostgreSQL
- Supabase

---

### Scripts SQL:

O projeto contém scripts responsáveis pela criação e manipulação do banco de dados:

- `tables.sql` - Criação das tabelas, chaves e restrições
- `insertInto.sql` - Inserção de dados de teste
- `consultas.sql` - Consultas específicas do sistema
- `filtro.sql` - Consultas com filtros e agregações
- `anyAll.sql` - Subconsultas utilizando ANY e ALL
- `exists.sql` - Subconsultas utilizando EXISTS
- `drop.sql` - Exclusão das tabelas do banco

---

### Visualização do Site

Para visualizar o sistema, você pode baixar este repositório e abrir o projeto localmente no seu computador.

Também é possível acessar a versão online através do GitHub Pages: https://s4naju.github.io/SistemaDeVendas/

---

### Observações

Esse trabalho é a versão beta de um sistema que futuramente será implementado para a empresa Sense Belts, com o objetivo de auxiliar o gerenciamento das vendas e organização das informações da empresa.

A aplicação busca facilitar o controle de clientes, produtos e pedidos, permitindo que o responsável pela empresa tenha uma visão mais organizada dos dados e consiga acompanhar as vendas realizadas de forma mais eficiente.

O desenvolvimento foi realizado em dupla, com a participação de **Guilherme Alves** na criação do sistema.

---

### Autora:
**Ana Julia Sampaio**

Disciplina: **Banco de Dados I**

Instituto Federal do Rio de Janeiro – **Campus Niterói**
