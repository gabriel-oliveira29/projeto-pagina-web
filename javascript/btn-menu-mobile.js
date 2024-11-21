let btnmenumobile = document.querySelector('#btn-menu-mobile')
let line1 = document.querySelector('.linha-menumob1')
let line2 = document.querySelector('.linha-menumob2')
let line3 = document.querySelector('.linha-menumob3')
let menumobile = document.querySelector('#menu-mobile')
let body = document.querySelector('body')
let sairmenumobile = document.querySelector('#sair-menumobile')
let sair1 = document.querySelector('#sair1')
let sair2= document.querySelector('#sair2')
let sair3 = document.querySelector('#sair3')
let sair4 = document.querySelector('#sair4')
let sair5 = document.querySelector('#sair5')



btnmenumobile.addEventListener("click", ()=>{
    line1.classList.toggle('ativo1')
    line2.classList.toggle('ativo2')
    line3.classList.toggle('ativo3')
    menumobile.classList.toggle('abrir')
    body.classList.toggle('no-overflow')
})

sairmenumobile.addEventListener("click", ()=>{
    sairmenumobile.classList.remove('ativo')
    menumobile.classList.remove('abrir')
    body.classList.toggle('no-overflow')
})

sair1.addEventListener("click", ()=>{
    sairmenumobile.classList.remove('ativo')
    menumobile.classList.remove('abrir')
    body.classList.toggle('no-overflow')
})
sair2.addEventListener("click", ()=>{
    sairmenumobile.classList.remove('ativo')
    menumobile.classList.remove('abrir')
    body.classList.toggle('no-overflow')
})
sair3.addEventListener("click", ()=>{
    sairmenumobile.classList.remove('ativo')
    menumobile.classList.remove('abrir')
    body.classList.toggle('no-overflow')
})
sair4.addEventListener("click", ()=>{
    sairmenumobile.classList.remove('ativo')
    menumobile.classList.remove('abrir')
    body.classList.toggle('no-overflow')
})
sair5.addEventListener("click", ()=>{
    sairmenumobile.classList.remove('ativo')
    menumobile.classList.remove('abrir')
    body.classList.toggle('no-overflow')
})