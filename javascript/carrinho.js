let btncarrinho = document.querySelector('#btn-carrinho')
let txtcarrinho = document.querySelector('#txt-carrinho')
let botaosaircarrinho = document.querySelector('#botao-sair-carrinho') 

btncarrinho.addEventListener("click", ()=>{
    btncarrinho.classList.toggle('ativo')
    txtcarrinho.classList.toggle('abrir')
})

botaosaircarrinho.addEventListener("click", () => {
    botaosaircarrinho.classList.remove('ativo');
    txtcarrinho.classList.remove('abrir');
})
