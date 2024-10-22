// Função para abrir o banco de dados IndexedDB
function abrirBancoDeDados() {
    const request = indexedDB.open("meuBancoDeDados", 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        db.createObjectStore("produtos", { keyPath: "nome" });
    };

    return request;
}

// Função para adicionar o produto ao HTML na categoria correta
function adicionarProdutoAoHTML(produto) {
    const container = document.getElementById(produto.categoria);
    
    if (container) {
        const card = document.createElement('div');
        card.className = 'produtos'; // Classe para estilização
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div>
                <h1>${produto.nome}</h1>
                <span>R$ ${parseFloat(produto.preco).toFixed(2)}</span>
                <button class="btn-produto" data-nome="${produto.nome}" data-preco="${produto.preco}" data-img="${produto.imagem}">Clique aqui</button>
            </div>
        `;
        container.appendChild(card);
    } else {
        console.error(`Categoria ${produto.categoria} não encontrada.`);
    }
}

// Função para carregar os produtos já cadastrados
function carregarProdutos() {
    const request = abrirBancoDeDados();
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction("produtos", "readonly");
        const store = transaction.objectStore("produtos");
        const allProducts = store.getAll();

        allProducts.onsuccess = function() {
            const produtos = allProducts.result;
            produtos.forEach(produto => {
                adicionarProdutoAoHTML(produto);
            });
        };
    };
}

// Função para excluir um produto
function excluirProduto(nomeProduto) {
    const request = abrirBancoDeDados();
    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction("produtos", "readwrite");
        const store = transaction.objectStore("produtos");

        const deleteRequest = store.delete(nomeProduto);

        deleteRequest.onsuccess = function() {
            alert(`Produto "${nomeProduto}" excluído com sucesso!`);
            atualizarProdutosHTML();
        };
    };
}

// Função para atualizar a exibição dos produtos na página
function atualizarProdutosHTML() {
    const container = document.querySelectorAll('.mostruario'); // Seleciona todas as seções de produtos
    container.forEach(div => div.innerHTML = ''); // Limpa todas as seções

    carregarProdutos(); // Recarrega os produtos
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarProdutos);

// Evento para cadastrar produto
document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário e mudança de página

    const nome = document.getElementById('produto').value;
    const categoria = document.getElementById('categoria').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const imagem = document.getElementById('imagem').files[0];

    if (!nome || !categoria || isNaN(preco) || !imagem) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Lê a imagem como URL
    const reader = new FileReader();
    reader.onload = function(e) {
        const produto = {
            nome: nome,
            categoria: categoria,
            preco: preco,
            imagem: e.target.result // Usa a URL da imagem
        };

        const request = abrirBancoDeDados();
        request.onsuccess = function(event) {
            const db = event.target.result;
            const transaction = db.transaction("produtos", "readwrite");
            const store = transaction.objectStore("produtos");

            // Verifica se o produto já existe
            const getRequest = store.get(nome);

            getRequest.onsuccess = function() {
                if (getRequest.result) {
                    // Se o produto existir, usa put() para atualizar
                    const updateRequest = store.put(produto);

                    updateRequest.onsuccess = function() {
                        adicionarProdutoAoHTML(produto);
                        document.getElementById('form-cadastro').reset();
                        alert(`Produto "${nome}" atualizado com sucesso!`);
                    };

                    updateRequest.onerror = function(event) {
                        alert('Erro ao atualizar o produto.');
                        console.error(event);
                    };
                } else {
                    // Se o produto não existir, usa add() para adicionar
                    const addRequest = store.add(produto);

                    addRequest.onsuccess = function() {
                        adicionarProdutoAoHTML(produto);
                        document.getElementById('form-cadastro').reset();
                        alert(`Produto "${nome}" cadastrado com sucesso!`);
                    };

                    addRequest.onerror = function(event) {
                        alert('Erro ao adicionar o produto.');
                        console.error(event);
                    };
                }
            };
        };
    };
    reader.readAsDataURL(imagem); // Lê a imagem como URL
});

// Evento para excluir produto ao clicar no botão
document.getElementById('excluir').addEventListener('click', function() {
    const nomeProduto = document.getElementById('produto-excluir').value.trim();
    if (nomeProduto) {
        excluirProduto(nomeProduto);
        document.getElementById('produto-excluir').value = ''; // Limpa o campo de entrada
    } else {
        alert('Por favor, insira o nome do produto que deseja excluir.');
    }
});
