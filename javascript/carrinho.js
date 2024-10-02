let btncarrinho = document.querySelector('#btn-carrinho')
let txtcarrinho = document.querySelector('#txt-carrinho')

btncarrinho.addEventListener("click", ()=>{
    btncarrinho.classList.toggle('ativo')
    txtcarrinho.classList.toggle('abrir')
})