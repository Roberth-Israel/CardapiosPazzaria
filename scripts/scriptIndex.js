// Função para o botão "Peça pelo WhatsApp"
function pedirWhatsapp() {
    // Substitua o número de telefone abaixo pelo número da sua pizzaria no WhatsApp
    const numeroWhatsapp = "+55 81 99654 3156";
    const mensagem = "Olá, gostaria de fazer uma reserva!";
    const linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${encodeURIComponent(mensagem)}`;
    window.open(linkWhatsapp, '_blank');
}

// Função para o botão "Conheça nosso cardápio"
function verCardapio() {
    // Substitua a URL abaixo pela URL correta do cardápio da sua pizzaria
    const urlCardapio = "https://blog.maxmilhas.com.br/dicas-de-viagem/restaurantes-fortaleza";
    window.open(urlCardapio, '_blank');
}

// Adicionando os eventos de clique aos botões
document.getElementById('pedWats').addEventListener('click', pedirWhatsapp);
document.getElementById('cardapio').addEventListener('click', verCardapio);