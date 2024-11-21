document.addEventListener('DOMContentLoaded', () => {
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

    // Usar delegação de eventos para lidar com os cliques nos botões de produtos
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains('btn-produto')) {
            event.stopPropagation(); 

            let btn = event.target; 
            let nome = btn.dataset.nome;
            let preco = parseFloat(btn.dataset.preco);
            let imgSrc = btn.dataset.img;

            let novoItem = document.createElement("li");
            novoItem.classList.add("carrinho-item");

            // Cria e adiciona a imagem
            let img = document.createElement("img");
            img.src = `uploads/${imgSrc}`; 
            img.alt = nome;
            img.style.width = '50px';
            img.style.marginRight = '10px';

            // Cria o texto do item
            let textoItem = document.createElement("span");
            let quantidade = 1; 

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

            btnAumentar.addEventListener("click", () => {
                quantidade++;
                total += preco;
                atualizarTexto();
                atualizarTotal();
            });

            btnDiminuir.addEventListener("click", () => {
                if (quantidade > 1) {
                    quantidade--;
                    total -= preco;
                    atualizarTexto();
                    atualizarTotal();
                }
            });

            let btnRemover = document.createElement("button");
            btnRemover.textContent = "Remover";
            btnRemover.classList.add("btn-remover");

            btnRemover.addEventListener("click", () => {
                total -= preco * quantidade;
                listaCarrinho.removeChild(novoItem);
                quantidadeTotal -= quantidade;
                if (quantidadeTotal < 0) quantidadeTotal = 0;
                document.querySelector('#carrinho-quantidade').textContent = quantidadeTotal;
                atualizarTotal();
            });

            novoItem.appendChild(img);
            novoItem.appendChild(textoItem);
            novoItem.appendChild(btnAumentar);
            novoItem.appendChild(btnDiminuir);
            novoItem.appendChild(btnRemover);

            listaCarrinho.appendChild(novoItem);
            total += preco;
            quantidadeTotal++;
            document.querySelector('#carrinho-quantidade').textContent = quantidadeTotal;
            atualizarTotal();
        }
    });

    function atualizarTotal() {
        totalDisplay.textContent = `Total: R$ ${total >= 0 ? total.toFixed(2) : 0.00}`;
    }

    let btnComprar = document.querySelector('#btn-comprar');

    btnComprar.addEventListener("click", () => {
        if (total > 0) {
            alert(`Compra finalizada! Total: R$ ${total.toFixed(2)}`);
            listaCarrinho.innerHTML = '';
            total = 0;
            quantidadeTotal = 0;
            document.querySelector('#carrinho-quantidade').textContent = quantidadeTotal;
            atualizarTotal();
        } else {
            alert("Seu carrinho está vazio!");
        }
    });
});
