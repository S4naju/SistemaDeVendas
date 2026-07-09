const tabela = document.getElementById("listaClientes");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const numero = document.getElementById("numero");
const complemento = document.getElementById("complemento");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");   
const cpf = document.getElementById("cpf");
const salvar = document.getElementById("salvar");
const cancelar = document.getElementById("cancelar");

let clienteEditando = null;

window.addEventListener("load", () => {
    if (window.supabase) {
        listarClientes();
    } else {
        console.error("Supabase ainda não foi definido na window.");
    }
});

salvar.addEventListener("click", salvarCliente);
cancelar.addEventListener("click", limparFormulario);
async function listarClientes() {
    const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .order("nome");
    if(error){
        alert(error.message);
        return;
    }

    tabela.innerHTML = "";
    data.forEach(cliente => {
        const enderecoExibir = cliente.endereco || "Não informado";
        
        tabela.innerHTML += `<tr>
            <td><strong>${cliente.nome}</strong></td>
            <td>${cliente.cpf || "Sem CPF"}</td>
            <td>${cliente.email}</td>
            <td style="text-align: left; max-width: 300px; word-break: break-word;">${enderecoExibir}</td>
            <td>
                <div class="coluna-botoes">
                    <button class="editar" onclick="editarCliente(${cliente.cod_cliente})">
                        <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">edit</span> Editar
                    </button>
                    <button class="excluir" onclick="excluirCliente(${cliente.cod_cliente})">
                        <span class="material-symbols-outlined" style="font-size: 16px; vertical-align: middle;">delete</span> Excluir
                    </button>
                </div>
            </td>
        </tr>`;
    });
}

async function salvarCliente() {
    if (nome.value.trim() === "") {
        alert("Preencha o campo obrigatório: Nome.");
        return;
    }
    
    const enderecoCompleto = `${rua.value}, ${numero.value} - ${complemento.value ? complemento.value + ", " : ""}${bairro.value}, ${cidade.value} - ${estado.value}, CEP: ${cep.value}`;
    
    const dadosCliente = {
        nome: nome.value,
        cpf: cpf.value,
        email: email.value,
        endereco: enderecoCompleto
    };

    if (clienteEditando == null) {
        const { error } = await supabase
            .from("clientes")
            .insert([dadosCliente]);
        if (error) {
            console.log(error);
            alert(error.message);
            return;
        }
        alert("Cliente cadastrado com sucesso!");
    } else {
        const { error } = await supabase
            .from("clientes")
            .update(dadosCliente)
            .eq("cod_cliente", clienteEditando);
        if (error) {
            alert(error.message);
            return;
        }
        alert("Cliente atualizado com sucesso!");
    }
    limparFormulario();
    listarClientes();
}

async function editarCliente(id) {
    const { data } = await supabase
        .from("clientes")
        .select("*")
        .eq("cod_cliente", id)
        .single();

    clienteEditando = id;
    nome.value = data.nome || "";
    cpf.value = data.cpf || "";
    email.value = data.email || "";
    endereco.value = data.endereco || "";

    alert("Por segurança, preencha os campos de endereço novamente ao editar.");
    salvar.innerHTML = "Atualizar Cliente";
}

async function excluirCliente(id) {
    if (!confirm("Deseja excluir este cliente?")) return;
    const { error } = await supabase
        .from("clientes")
        .delete()
        .eq("cod_cliente", id);

    if (error) {
        alert("Não foi possível excluir.\nEste cliente pode possuir pedidos cadastrados.");
        return;
    }
    listarClientes();
}

function limparFormulario() {
    nome.value = "";
    cpf.value = ""; 
    email.value = "";
    cep.value = "";
    rua.value = "";
    numero.value = "";
    complemento.value = "";
    bairro.value = "";
    cidade.value = "";
    estado.value = "";
    clienteEditando = null;
    salvar.innerHTML = "Salvar Cliente";
}
