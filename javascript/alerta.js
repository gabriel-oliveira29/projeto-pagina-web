document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("form-cadastro"); 

    formulario.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const formData = new FormData(formulario); 
        fetch("http://localhost:5000/cadastrar", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao cadastrar produto");
            }
            return response.json();
        })
        .then(data => {
            
            alert(data.message);
            
            formulario.reset(); 
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao cadastrar produto. Tente novamente.");
        });
    });
});
