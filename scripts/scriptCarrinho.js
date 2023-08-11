// Array para armazenar os itens do carrinho
const carrinho = [];

// Função para carregar o carrinho do localStorage
function carregarCarrinhoDoLocalStorage() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho.push(...JSON.parse(carrinhoSalvo));
        atualizarCarrinho();
    }
}

// Função para salvar o carrinho no localStorage
function salvarCarrinhoNoLocalStorage() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}


// Carregar o carrinho do localStorage ao carregar a página
carregarCarrinhoDoLocalStorage();


// Função para atualizar a exibição do carrinho na página
function atualizarCarrinho() {
    const carrinhoTbody = document.getElementById('carrinho-tbody');
    carrinhoTbody.innerHTML = ''; // Limpa o conteúdo atual do carrinho

    let total = 0;
    for (let i = 0; i < carrinho.length; i++) {
        const item = carrinho[i];
        const subtotal = item.preco * item.quantidade; // Calcula o subtotal do item

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td><button onclick="alterarItem(${i})">Alterar</button></td>
            <td><button onclick="excluirItem(${i})">Excluir</button></td>
        `;
        carrinhoTbody.appendChild(row);

        total += subtotal;
    }

    const carrinhoTotal = document.getElementById('carrinho-total');
    carrinhoTotal.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}


function alterarItem(index) {
    const novaQuantidadeStr = prompt('Digite a nova quantidade de itens:');
    const novaQuantidade = parseInt(novaQuantidadeStr);

    if (!isNaN(novaQuantidade) && novaQuantidade >= 0) {
        carrinho[index].quantidade = novaQuantidade;
        salvarCarrinhoNoLocalStorage();
        atualizarCarrinho();
    } else {
        alert('Digite uma quantidade válida (número inteiro maior ou igual a zero).');
    }
}

function excluirItem(index) {
    if (confirm('Tem certeza que deseja excluir este item do carrinho?')) {
        carrinho.splice(index, 1); // Remove o item do array
        salvarCarrinhoNoLocalStorage(); // Salva as alterações no localStorage
        atualizarCarrinho(); // Atualiza a exibição do carrinho na página
    }
}


function enviarPedidoWhatsApp() {
    const carrinhoTotal = document.getElementById('carrinho-total');
    const total = parseFloat(carrinhoTotal.textContent.replace('Total: R$ ', ''));
    const numeroWhatsapp = "+55 81 99654 3156";
    let mensagem = 'Olá, vim pelo site! Segue abaixo o pedido do Carrinho de Compras:\n';
    for (let i = 0; i < carrinho.length; i++) {
        const item = carrinho[i];
        const subtotal = item.preco * item.quantidade;
        mensagem += `${item.nome} - ${item.quantidade} unidades - Subtotal: R$ ${subtotal.toFixed(2)}\n`;
    }
    mensagem += `Total do Pedido: R$ ${total.toFixed(2)}`;
    
    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsapp, '_blank')

    // Abre o WhatsApp com a mensagem do pedido preenchida
    window.open(whatsappLink, '_blank');
}

BTN