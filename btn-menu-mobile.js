let btnmenumobile = document.querySelector('#btn-menu-mobile')
let line1 = document.querySelector('.linha-menumob1')
let line2 = document.querySelector('.linha-menumob2')
let line3 = document.querySelector('.linha-menumob3')
let menumobile = document.querySelector('#menu-mobile')
let body = document.querySelector('body')

btnmenumobile.addEventListener("click", ()=>{
    line1.classList.toggle('ativo1')
    line2.classList.toggle('ativo2')
    line3.classList.toggle('ativo3')
    menumobile.classList.toggle('abrir')
    body.classList.toggle('no-overflow')
})