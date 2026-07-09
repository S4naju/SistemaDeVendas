const Produto = document.getElementById("produto");
const faixa = document.getElementById("faixa");
const chaveiro = document.getElementById("chaveiro");
const tabela = document.getElementById("listaItens");
const total = document.getElementById("valorTotal");
const pagamento = document.getElementById("pagamento");
let itens = [];


document.addEventListener("DOMContentLoaded", () => {
    carregarClientes();
});
async function carregarClientes() {
    const selectCliente = document.getElementById("cliente");
    selectCliente.innerHTML = `<option value="">Selecione um cliente...</option>`;

    try {
        const { data, error } = await window.supabase
            .from("clientes")
            .select("cod_cliente, nome")
            .order("nome");
        if (error) {
            console.error("Erro Supabase:", error.message);
            alert("Erro ao carregar clientes.");
            return;
        }
        data.forEach((cliente) => {
            const option = document.createElement("option");
            option.value = cliente.cod_cliente;
            option.textContent = cliente.nome;
            selectCliente.appendChild(option);
        });
    } catch (erro) {
        console.error("Erro:", erro);
    }
}

//pra mostrar o chaveirou ou a faixa
Produto.addEventListener("change", function () {
    faixa.classList.remove("mostrar");
    chaveiro.classList.remove("mostrar");

    if (this.value === "faixa") {
        faixa.classList.add("mostrar");
    } else if (this.value === "chaveiro") {
        chaveiro.classList.add("mostrar");
    }
});

//adicionar itemm
document.getElementById("adicionar").addEventListener("click", adicionarItem);
async function adicionarItem() {
    console.log("Botão adicionar clicado - Salvando diretamente no banco");
    
    const cliente = document.getElementById("cliente").value;
    const tipoProduto = Produto.value;
    const quantidade = Number(document.getElementById("quantidade").value);
    
    const pagamento = document.getElementById("pagamento").value;
    const dataPedido = new Date().toISOString().split('T')[0];

    if (!cliente) {
        alert("Por favor, selecione um cliente antes de adicionar.");
        return;
    }

    if (!tipoProduto) {
        alert("Selecione um produto (Faixa ou Chaveiro).");
        return;
    }

    let nomeProdutoMontado = "";
    let descricaoDetalhada = "";
    let precoUnitario = 0;
    let personalizado = false;
    let nomeBordado = null;
    if (tipoProduto === "faixa") {
        const modeloSelect = document.getElementById("modeloFaixa").value;
        const modalidade = document.getElementById("modalidadeFaixa").value;
        const cor = document.getElementById("corFaixa").value;
        const personalizacao = document.getElementById("personalizar").value;
        const nomeTexto = document.getElementById("nomePersonalizado").value.trim();

        if (personalizacao === "Sim") {
            if (nomeTexto === "") {
                alert("Digite o nome para bordar.");
                return;
            }
        }

        personalizado = true;
        nomeBordado = nomeTexto;
        
        if (!modeloSelect || !cor) {
            alert("Por favor, selecione o modelo e a cor da faixa.");
            return;
        }

        if (modeloSelect === "BELT OX STANDARD" || modeloSelect === "BELT BR STANDARD") {
            precoUnitario = personalizacao === "Sim" ? 75.00 : 50.00;
        } else if (modeloSelect === "BELT BR PRO") {
            precoUnitario = personalizacao === "Sim" ? 135.00 : 90.00;
        } else if (modeloSelect === "BELT BR PREMIUM") {
            precoUnitario = personalizacao === "Sim" ? 175.00 : 120.00;
        }

        nomeProdutoMontado = `Faixa ${modeloSelect}`;
        descricaoDetalhada = `Modalidade: ${modalidade}, Cor: ${cor}`;


    } else if (tipoProduto === "chaveiro") {
        const modalidade = document.getElementById("modalidadeChaveiro").value;
        const cor = document.getElementById("corChaveiro").value;

        precoUnitario = 15.00; 
        nomeProdutoMontado = "Chaveiro Belt";
        descricaoDetalhada = `Modalidade: ${modalidade}, Cor: ${cor}`;
    }

    const subtotal = quantidade * precoUnitario;

    try {
        const { data: novoPedido, error: erroPedido } = await window.supabase
            .from("pedidos")
            .insert([{
                cod_cliente: parseInt(cliente),
                data: dataPedido,
                forma_pagamento: pagamento,
                total: subtotal
            }])
            .select("id_pedido")
            .single();

        if (erroPedido) throw erroPedido;
        const idPedidoGerado = novoPedido.id_pedido;

        const { error: erroItem } = await window.supabase
            .from("itens_pedido")
            .insert([{
                id_pedido: idPedidoGerado,
                produto_descricao: `${nomeProdutoMontado} - ${descricaoDetalhada}`,
                quantidade: quantidade,
                preco_unitario: precoUnitario,
                subtotal: subtotal,
                personalizado: personalizado,
                nome_bordado: nomeBordado
            }]);

        if (erroItem) throw erroItem;

        alert("Pedido salvo com sucesso!");

        itens.push({
            nome: nomeProdutoMontado,
            descricao: descricaoDetalhada,
            quantidade: quantidade,
            preco: precoUnitario,
            subtotal: subtotal,
        });

        atualizarTabela();

        document.getElementById("quantidade").value = 1;
        document.getElementById("nomePersonalizado").value = "";
        document.getElementById("personalizar").value = "Não";

    } catch (err) {
        console.error("Erro ao salvar dados nas tabelas:", err);
        alert("Erro técnico ao salvar o pedido: " + err.message);
    }
};

function atualizarTabela() {
    tabela.innerHTML = "";
    let valorTotal = 0;

    itens.forEach((item, indice) => {
        valorTotal += item.subtotal;

        tabela.innerHTML += `<tr>
            <td>${item.nome}</td>
            <td>${item.descricao}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>R$ ${item.subtotal.toFixed(2)}</td>
            <td>
                <button class="excluir" onclick="removerItem(${indice})">X</button>
            </td>
        </tr>`;
    });

    total.innerHTML = "R$ " + valorTotal.toFixed(2);
}

function removerItem(indice) {
    itens.splice(indice, 1);
    atualizarTabela();
}
