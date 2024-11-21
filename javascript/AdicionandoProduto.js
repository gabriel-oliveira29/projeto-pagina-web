function adicionarProduto() {
    fetch("http://localhost:5000/produtos", {method: "get"})
        .then(response => {
            return response.json();
        })
        .then(produtos => {
            produtos.forEach(produto => {
        
                const categoriaContainer = document.getElementById(produto.categoria);
    
                if (categoriaContainer) {
                    
                    const card = document.createElement("div");
                    card.classList.add("produtos");
    
                    card.innerHTML = `
                        <img src="uploads/${produto.imagem}" alt="${produto.nome}">
                        <div>
                            <h1>${produto.nome}</h1>
                            <span>R$${produto.preco}</span>
                            <button class="btn-produto" data-nome="${produto.nome}" data-preco="${produto.preco}" data-img="${produto.imagem}">adicionar</button>
                        </div>
                    `;
    
                    categoriaContainer.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error("Erro ao carregar produtos:", error);
        }); 
}