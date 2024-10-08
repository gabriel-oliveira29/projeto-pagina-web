let btnCarrinho = document.querySelector('#btn-carrinho');
let txtCarrinho = document.querySelector('#txt-carrinho');
let btnSairCarrinho = document.querySelector('#botao-sair-carrinho');
let listaCarrinho = document.querySelector('#listacarrinho');
let totalDisplay = document.createElement("div");
totalDisplay.id = "total-display"; // Cria um elemento para mostrar o total
txtCarrinho.appendChild(totalDisplay); // Adiciona o total ao carrinho

let total = 0; // Inicializa o total
let quantidadeTotal = 0; // Para rastrear o total de itens no carrinho

// Abre e fecha o carrinho
btnCarrinho.addEventListener("click", () => {
    btnCarrinho.classList.toggle('ativo');
    txtCarrinho.classList.toggle('abrir');
});

// Fecha o carrinho
btnSairCarrinho.addEventListener("click", () => {
    btnCarrinho.classList.remove('ativo');
    txtCarrinho.classList.remove('abrir');
});

// Seleciona todos os botões de produto
let btnProdutos = document.querySelectorAll('.btn-produto');

btnProdutos.forEach(btn => {
    btn.addEventListener("click", (event) => {
        // Previne o fechamento do carrinho
        event.stopPropagation(); 

        let nome = btn.dataset.nome;
        let preco = parseFloat(btn.dataset.preco);
        let imgSrc = btn.dataset.img;

        let novoItem = document.createElement("li");
        novoItem.classList.add("carrinho-item"); // Classe para estilizar/remover

        // Cria e adiciona a imagem
        let img = document.createElement("img");
        img.src = imgSrc;
        img.alt = nome;
        img.style.width = '50px';
        img.style.marginRight = '10px';

        // Cria o texto do item
        let textoItem = document.createElement("span");
        let quantidade = 1; // Inicializa a quantidade

        // Atualiza o texto do item
        function atualizarTexto() {
            textoItem.textContent = `${nome} - R$ ${(preco * quantidade).toFixed(2)} (${quantidade})`;
        }

        atualizarTexto(); // Atualiza o texto inicialmente

        // Botões para aumentar e diminuir a quantidade
        let btnAumentar = document.createElement("button");
        btnAumentar.textContent = "+";
        let btnDiminuir = document.createElement("button");
        btnDiminuir.textContent = "-";

        // Adiciona eventos para os botões de aumentar e diminuir
        btnAumentar.addEventListener("click", () => {
            quantidade++;
            total += preco; // Atualiza o total
            atualizarTexto(); // Atualiza a exibição do item
            atualizarTotal(); // Atualiza o total na exibição
        });

        btnDiminuir.addEventListener("click", () => {
            if (quantidade > 1) {
                quantidade--;
                total -= preco; // Atualiza o total
                atualizarTexto(); // Atualiza a exibição do item
                atualizarTotal(); // Atualiza o total na exibição
            }
        });

        // Botão de remover
        let btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.classList.add("btn-remover");

        // Adiciona evento ao botão de remover
        btnRemover.addEventListener("click", () => {
            total -= preco * quantidade; // Atualiza o total ao remover
            listaCarrinho.removeChild(novoItem); // Remove o item da lista
            
            // Atualiza a quantidade total, garantindo que não fique negativa
            quantidadeTotal -= quantidade; 
            if (quantidadeTotal < 0) quantidadeTotal = 0; // Garante que não fique negativo
            
            // Atualiza o marcador de quantidade
            document.querySelector('#carrinho-quantidade').textContent = quantidadeTotal; 

            atualizarTotal(); // Atualiza a exibição do total
        });

        // Adiciona a imagem, texto e botões ao novo item
        novoItem.appendChild(img);
        novoItem.appendChild(textoItem);
        novoItem.appendChild(btnAumentar);
        novoItem.appendChild(btnDiminuir);
        novoItem.appendChild(btnRemover);

        listaCarrinho.appendChild(novoItem);
        total += preco; // Adiciona o preço inicial ao total
        quantidadeTotal++; // Aumenta a quantidade total
        document.querySelector('#carrinho-quantidade').textContent = quantidadeTotal; // Atualiza o marcador
        atualizarTotal(); // Atualiza a exibição do total
    });
});

// Função para atualizar o total
function atualizarTotal() {
    totalDisplay.textContent = `Total: R$ ${total >= 0 ? total.toFixed(2) : 0.00}`; // Exibe o total formatado, evitando valores negativos
}

// Botão de comprar
let btnComprar = document.querySelector('#btn-comprar');

btnComprar.addEventListener("click", () => {
    if (total > 0) {
        alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}`);
        listaCarrinho.innerHTML = ''; // Limpa os itens do carrinho
        total = 0; // Reseta o total
        quantidadeTotal = 0; // Reseta a quantidade total
        document.querySelector('#carrinho-quantidade').textContent = quantidadeTotal; // Atualiza o marcador
        atualizarTotal(); // Atualiza a exibição do total
    } else {
        alert("Seu carrinho está vazio!");
    }
});
