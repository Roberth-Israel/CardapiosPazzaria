
// Variável para armazenar os itens do carrinho
let carrinho = [];

function incrementQuantity(itemId) {
    const quantityElement = document.querySelector(`#${itemId} .quantity`);
    const currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
}

function decrementQuantity(itemId) {
    const quantityElement = document.querySelector(`#${itemId} .quantity`);
    const currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
    }
}

// Função para carregar o carrinho do localStorage, se existir
function carregarCarrinhoDoLocalStorage() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        atualizarDivCarrinho();
    }
}

// Função para salvar o carrinho no localStorage
function salvarCarrinhoNoLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function exibirMensagemDeConfirmacao(nome) {
    alert(`Você adicionou ${nome} ao carrinho!`);
}

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(itemId, nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    const quantityElement = document.querySelector(`#${itemId} .quantity`);

    // Obter a quantidade diretamente do span com a classe 'quantity'
    const quantidade = parseInt(quantityElement.textContent);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({ nome, preco, quantidade });
    }
    salvarCarrinhoNoLocalStorage();
    atualizarDivCarrinho();
    exibirMensagemDeConfirmacao(nome); // Exibe a mensagem de confirmação ao adicionar um item
}


function exibirDivCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho-container');
    carrinhoContainer.style.display = "block";
}

// Função para atualizar a exibição do carrinho na página
function atualizarDivCarrinho() {
    exibirDivCarrinho();

    const carrinhoContainer = document.getElementById('carrinho-container');
    carrinhoContainer.innerHTML = ''; // Limpa o conteúdo atual do carrinho

    const carrinhoTitulo = document.createElement('h1');
    carrinhoTitulo.innerHTML = `Itens adicionados ao carrinho`;

    const tabela = document.createElement('table');
    tabela.innerHTML = `
        <tr>
            <th>Qtd</th>
            <th>Item</th>
            <th>Valor unitário</th>
            <th>Sub Total</th>
        </tr>
    `;

    let totalPedido = 0;
    for (const item of carrinho) {
        const precoTotalPorItem = item.preco * item.quantidade;
        const linhaItem = document.createElement('tr');
        linhaItem.innerHTML = `
            <td>${item.quantidade}</td>
            <td>${item.nome}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>R$ ${precoTotalPorItem.toFixed(2)}</td>
        `;
        tabela.appendChild(linhaItem); // Anexar cada item à tabela
        totalPedido += precoTotalPorItem;
    }

    const carrinhoTotal = document.createElement('div');
    carrinhoTotal.innerHTML = `Total do pedido: R$ ${totalPedido.toFixed(2)}`;

    const btn_fazerPedido = document.createElement('button');
    btn_fazerPedido.innerText = "Ir para carrinho";
    btn_fazerPedido.onclick = function() {
        // Redirecionar para a página "carrinho.html"
        window.location.href = "carrinho.html";
    };

    // Anexar a tabela ao DocumentFragment
    carrinhoContainer.appendChild(carrinhoTitulo);
    carrinhoContainer.appendChild(tabela);
    carrinhoContainer.appendChild(carrinhoTotal);
    carrinhoContainer.appendChild(btn_fazerPedido);
}

// Carregar o carrinho do localStorage ao carregar a página
carregarCarrinhoDoLocalStorage();
