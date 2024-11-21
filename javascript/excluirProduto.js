function excluirProduto() {
    const botaoExcluir = document.getElementById("excluir");
    const inputProdutoExcluir = document.getElementById("produto-excluir");

    botaoExcluir.addEventListener("click", async () => {
        alert("clicado botao");

        const nomeProduto = inputProdutoExcluir.value.trim(); 
        if (nomeProduto === "") {
            alert("Por favor, insira o nome do produto a ser excluído.");
            return; 
        }

        try {
            const response = await fetch(`http://localhost:5000/excluir/${nomeProduto}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Erro ao excluir produto");
            }

            const data = await response.json();
            alert(data.message); 
            inputProdutoExcluir.value = ""; 
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao excluir produto. Tente novamente.");
        }
    });
}