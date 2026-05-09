    // Menu principal

var menuIcon = document.querySelector('.menu-icon')
var navList = document.querySelector('.nav_list')

menuIcon.addEventListener('click', ()=>{
    // Mostrar
    if (navList.classList.contains('ativo')){
        navList.classList.remove('ativo');
        document.querySelector('.menu-icon img').src = 'img/menu.png'
        document.body.style.overflow = "scroll";

    }
    // Esconder
    else{
        navList.classList.add('ativo');
        document.querySelector('.menu-icon img').src = 'img/close.png';
        document.body.style.overflow = "hidden";
    }
})

// Ativando e Removendo menu
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    // Ativando link
    navList.classList.add('ativo');
    document.querySelector('.menu-icon img').src = 'img/menu.png'
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active')
    document.body.style.overflow = "scroll";

    // Removendo menu
    navList.classList.remove('ativo')
}

navLink.forEach(n => n.addEventListener('click', linkAction))
    
    // end Menu Principal
    // Slider Projetos
/*
var radio = document.querySelector('.manual-btn')
var cont = 1

// Confirmando primeiro input marcado
document.getElementById('radio1').checked = true

setInterval(() => {
    proximaImg()
}, 8000)

function proximaImg(){
    cont++

    if(cont > 2){
        cont = 1
    }

    document.getElementById('radio'+cont).checked = true
}

    // end Slider Projetos
*/