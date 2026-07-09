//pesquisar clientes
document.getElementById("btnPesquisarCliente").addEventListener("click", pesquisarCliente);
async function pesquisarCliente() {
    const nome = document.getElementById("pesquisaCliente").value;
    const { data, error } = await window.supabase
        .from("clientes")
        .select("*")
        .ilike("nome", `%${nome}%`);
    if (error) {
        console.error(error);
        return;
    }

    const tabela = document.getElementById("resultadoClientes");
    tabela.innerHTML = "";
    data.forEach(cliente => {
        tabela.innerHTML += `<tr>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.email}</td>
            <td>${cliente.endereco}</td>
        </tr>`;
    });
}

//pesquisar produtos
document.getElementById("btnPesquisarProduto").addEventListener("click", pesquisarProduto);
async function pesquisarProduto() {
    const termoBusca = document.getElementById("pesquisaProduto").value.trim();
    const { data, error } = await window.supabase
        .from("produtos")
        .select("*")
        .or(`nome.ilike.%${termoBusca}%,cor.ilike.%${termoBusca}%`);

    if (error) {
        console.error("Erro ao buscar produtos:", error);
        return;
    }

    const tabela = document.getElementById("resultadoProdutos");
    tabela.innerHTML = "";

    if (data.length === 0) {
        tabela.innerHTML = `<tr><td colspan="5" style="font-style: italic; color: #999; padding: 15px;">Nenhum produto ou cor correspondente encontrado.</td></tr>`;
        return;
    }

    data.forEach(produto => {
        tabela.innerHTML += `<tr>
            <td style="font-weight: 500; color: #333; text-align: center;">${produto.nome}</td>
            <td>${produto.modelo || 'N/A'}</td>
            <td>${produto.cor || 'Variada'}</td>
            <td>R$ ${Number(produto.preco_unitario).toFixed(2)}</td>
            <td>${produto.estoque}</td>
        </tr>`;
    });
}

//por data
document.getElementById("btnPedidos").addEventListener("click", pedidosData);
async function pedidosData(){
    const dataEscolhida = document.getElementById("dataConsulta").value;
    if (!dataEscolhida) {
        alert("Por favor, selecione uma data.");
        return;
    }

    const { data, error } = await window.supabase
        .from("pedidos")
        .select(`
            data,
            total,
            clientes ( nome )
        `)
        .eq("data", dataEscolhida);

    if (error) {
        console.error("Erro ao buscar pedidos por data:", error);
        return;
    }

    const tabela = document.getElementById("resultadoPedidos");
    tabela.innerHTML = "";

    if (data.length === 0) {
        tabela.innerHTML = `<tr><td colspan="3" style="font-style: italic; color: #999;">Nenhum pedido nesta data.</td></tr>`;
        return;
    }

    data.forEach(pedido => {
        const nomeCliente = pedido.clientes ? pedido.clientes.nome : "Cliente não identificado";
        tabela.innerHTML += `<tr>
            <td>${nomeCliente}</td>
            <td>${pedido.data}</td>
            <td>R$ ${Number(pedido.total).toFixed(2)}</td>
        </tr>`;
    });
}

//media gasta
document.getElementById("btnMedia").addEventListener("click", mediaPedidos);
async function mediaPedidos(){
    const { data, error } = await window.supabase
        .from("pedidos")
        .select(`
            total,
            clientes ( nome )
        `);

    if (error) {
        console.error("Erro ao calcular médias:", error);
        return;
    }
    
    let medias = {};

    data.forEach(pedido => {
        if (!pedido.clientes) return; 
        const nome = pedido.clientes.nome;
        if (!medias[nome]) {
            medias[nome] = { soma: 0, quantidade: 0 };
        }
        medias[nome].soma += Number(pedido.total);
        medias[nome].quantidade++;
    });

    const tabela = document.getElementById("resultadoMedia");
    tabela.innerHTML = "";
    
    const clientesComPedidos = Object.keys(medias);
    if (clientesComPedidos.length === 0) {
        tabela.innerHTML = `<tr><td colspan="2" style="font-style: italic; color: #999;">Nenhuma movimentação registrada.</td></tr>`;
        return;
    }

    for (let cliente in medias) {
        let media = medias[cliente].soma / medias[cliente].quantidade;
        tabela.innerHTML += `<tr>
            <td>${cliente}</td>
            <td>R$ ${media.toFixed(2)}</td>
        </tr>`;
    }
}

//produtos nunca comprados
document.getElementById("btnNuncaComprados").addEventListener("click", nuncaComprados);
async function nuncaComprados(){
    const tabela = document.getElementById("resultadoNuncaComprados");
    tabela.innerHTML = `<tr><td colspan="6" style="color: #666; font-style: italic; padding: 2
    0px; text-align: center;">A carregar dados do catálogo...</td></tr>`;

    const { data: produtos, error: errProd } = await window.supabase
        .from("produtos")
        .select("*"); 

    const { data: itensVendidos, error: errItens } = await window.supabase
        .from("itens_pedido")
        .select("produto_descricao");

    if (errProd || errItens) {
        console.error("Erro detalhado do Supabase:", errProd || errItens);
        alert("Erro ao ligar ao Supabase. Abra a Consola (F12) para ver o erro real.");
        tabela.innerHTML = `<tr><td colspan="6" style="color: #d62828; font-weight: 500; padding: 20px; text-align: center;">Erro ao carregar dados. Verifique a consola.</td></tr>`;
        return;
    }

    tabela.innerHTML = "";

    const nuncaVendidos = produtos.filter(produto => {
        if (!produto.nome) return false;
        //ve se nome do produto aparecer em alg venda.
        return !itensVendidos.some(item => {
            return item.produto_descricao && 
                   item.produto_descricao.toLowerCase().includes(produto.nome.toLowerCase());
        });
    })
    if (nuncaVendidos.length === 0) {
        tabela.innerHTML = `<tr><td colspan="6" style="font-style: italic; color: #2e7d32; font-weight: 500; padding: 20px; text-align: center;">🎉 Excelente! Todos os produtos do catálogo possuem saídas.</td></tr>`;
        return;
    }
    nuncaVendidos.forEach(produto => {
        const precoBruto = produto.preco_unitario || produto.preco || 0;
        const preco = Number(precoBruto).toFixed(2);
        const categoria = produto.categoria || "Geral";
        const modelo = produto.modelo || "N/A";
        const cor = produto.cor || "Variada";

        tabela.innerHTML += `<tr>
            <td style="font-weight: 500; color: #333; text-align: center;">${produto.nome}</td>
            <td>${modelo}</td>
            <td>${cor}</td>
            <td><span class="categoria">${categoria}</span></td>
            <td style="color: #d62828; font-weight: 600;">R$ ${preco}</td>
            <td><span class="status">Sem Saída</span></td>
        </tr>`;
    });
}

window.addEventListener("load", () => {
    if (window.supabase) {
        carregarContadoresConsultas();
    }
});

//contadores do topo
async function carregarContadoresConsultas() {
    try {
        const { count: totalClientes } = await window.supabase
            .from("clientes")
            .select("*", { count: 'exact', head: true });
            
        const { count: totalPedidos } = await window.supabase
            .from("pedidos")
            .select("*", { count: 'exact', head: true });
            
        const { count: totalProdutos } = await window.supabase
            .from("produtos")
            .select("*", { count: 'exact', head: true });

        const { data: todosPedidos } = await window.supabase
            .from("pedidos")
            .select("total");

        let faturamento = 0;
        if (todosPedidos) {
            faturamento = todosPedidos.reduce((soma, p) => soma + Number(p.total || 0), 0);
        }

        document.getElementById("totalClientes").innerText = totalClientes || 0;
        document.getElementById("totalPedidos").innerText = totalPedidos || 0;
        document.getElementById("totalProdutos").innerText = totalProdutos || 0;
        document.getElementById("valorVendas").innerText = `R$ ${faturamento.toFixed(2).replace('.', ',')}`;
    } catch (e) {
        console.error("Erro ao carregar indicadores do topo:", e);
    }
}
