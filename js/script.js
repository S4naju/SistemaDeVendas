window.addEventListener("load", () => {
    if (window.supabase) {
        carregarContadoresDashboard();
    } else {
        console.error("Supabase não carregado.");
    }
});

async function carregarContadoresDashboard() {
    try {
        const { count: totalClientes, error: errC } = await supabase
            .from("clientes")
            .select("*", { count: 'exact', head: true });
        const { count: totalPedidos, error: errPed } = await supabase
            .from("pedidos")
            .select("*", { count: 'exact', head: true });
        const { count: totalProdutos, error: errProd } = await supabase
            .from("produtos")
            .select("*", { count: 'exact', head: true });

        const cards = document.querySelectorAll(".cardCard div p");
        if (!errC && totalClientes !== null) cards[0].innerText = `${totalClientes} cadastrados`;
        if (!errPed && totalPedidos !== null) cards[1].innerText = `${totalPedidos} processados`;
        if (!errProd && totalProdutos !== null) cards[2].innerText = `${totalProdutos} em catálogo`;
    } catch (e) {
        console.log("Erro ao alimentar contadores do painel:", e);
    }
}
