"use strict";

const image = document.querySelector("img");
const sectionone = document.querySelector(".section-one");
const sectiontwo = document.querySelector(".section-two");
const sectionthree = document.querySelector(".section-three");
const sectionfour = document.querySelector(".section-four");
const sectionfive = document.querySelector(".section-five");
const sectionsix = document.querySelector(".section-six");
const sectionmenu = document.querySelector(".section-menu");

const removeActiveNav = () => {
    for(let i of document.querySelectorAll(".nav__a")){
        try{
            i.classList.remove("nav__a--active");
        }catch(e){};
    }
}


addEventListener("scroll",(e)=>{
    image.style.transform = `translate(${scrollX / 1.1}px, ${scrollY / 1.1}px) scale(105%)`;
    if(scrollX > 0){
        scroll(0,scrollY)
    }

    //DETERMINE NAV ACTIVE ONE
    if(scrollY < sectiontwo.offsetTop - 75){
        removeActiveNav();
        document.querySelectorAll(".nav__a")[0].classList.add("nav__a--active");
    }else if(scrollY > sectiontwo.offsetTop - 75 && scrollY < sectionthree.offsetTop - 75){
        removeActiveNav();
        document.querySelectorAll(".nav__a")[1].classList.add("nav__a--active");
    }else if(scrollY > sectionthree.offsetTop - 75 && scrollY < sectionfour.offsetTop - 75){
        removeActiveNav();
        document.querySelectorAll(".nav__a")[3].classList.add("nav__a--active");
    }else if(scrollY > sectionsix.offsetTop - 75){
        removeActiveNav();
        document.querySelectorAll(".nav__a")[4].classList.add("nav__a--active");
        if(activeMenu) document.querySelectorAll(".nav__a")[4].classList.remove("nav__a--active");
    }
})

mapboxgl.accessToken = 'pk.eyJ1IjoieGxva3lyYXkiLCJhIjoiY2t4dDBqN2l2M2oweDJwdWJrNm81OGFqdSJ9.fngFFin3bpLpNhYKGHaixA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
    center: [-3.703343,40.416721], // starting position [lng, lat]
    zoom: 15, // starting zoom
});

document.querySelector(".button-plus").addEventListener("click",()=>{
    map.zoomIn(1);
});
document.querySelector(".button-minus").addEventListener("click",()=>{
    map.zoomOut(1);
});

addEventListener("load",()=>{
    document.querySelector(".mapboxgl-control-container").remove();
});


//NAV SCROLLS
document.querySelectorAll(".nav__a")[0].addEventListener("click",()=>{
    scroll(0,`${sectionone.offsetTop - 100}`);
            for(let i = 2; i < 8; i++){
            document.querySelector(`main section:nth-child(${i})`).style.display = 'flex';
        }
    menuRemove();
})
document.querySelectorAll(".nav__a")[1].addEventListener("click",()=>{
    scroll(0,`${sectiontwo.offsetTop - 74}`);
            for(let i = 2; i < 8; i++){
            document.querySelector(`main section:nth-child(${i})`).style.display = 'flex';
        }
    menuRemove();
})
document.querySelectorAll(".nav__a")[3].addEventListener("click",()=>{
    scroll(0,`${sectionthree.offsetTop - 74}`);
            for(let i = 2; i < 8; i++){
            document.querySelector(`main section:nth-child(${i})`).style.display = 'flex';
        }
    menuRemove();
})
document.querySelectorAll(".nav__a")[4].addEventListener("click",()=>{
    scroll(0,`${sectionsix.offsetTop - 74}`);
            for(let i = 2; i < 8; i++){
            document.querySelector(`main section:nth-child(${i})`).style.display = 'flex';
        }
    menuRemove();
})
document.querySelector(".return").addEventListener("click",()=>{
    scroll(0,0);
})


let activeMenu = false;
const menuStart = () => {
    scroll(0,0);
    sectionmenu.style.opacity = 1;
    sectionmenu.style.zIndex = 1000;
    activeMenu = true;
    document.querySelectorAll(".nav__a")[2].style.color = '#eee';
    
    for(let i = 2; i < 8; i++){ //BLURS EVERYTHING ON MAIN PAGE
        document.querySelector(`main section:nth-child(${i})`).style.filter = 'blur(6px)';
    }

    if(scrollY == 0) document.querySelectorAll(".nav__a")[0].style.color = '#323232';

    setTimeout(() => {
        for(let i = 2; i < 8; i++){
            document.querySelector(`main section:nth-child(${i})`).style.display = 'none';
        }
        document.querySelector(".section-one__text").style.opacity = 0;
    }, 500);
}
const menuRemove = () => {
    if(activeMenu) scroll(0,0);
    sectionmenu.style.opacity = 0;
    for(let i = 2; i < 8; i++){
        if(i > 6) document.querySelector(`main section:nth-child(${i})`).style.display = 'block';
        else document.querySelector(`main section:nth-child(${i})`).style.display = 'flex';
        document.querySelector(`main section:nth-child(${i})`).style.filter = 'blur(0)';
    }
    document.querySelectorAll(".nav__a")[2].style.color = '#323232'
    setTimeout(() => {
        sectionmenu.style.zIndex = -1;
        activeMenu = false;
        document.querySelector(".section-one__text").style.opacity = 1;
    }, 500);
}

document.querySelectorAll(".nav__a")[2].addEventListener("click",()=>{
    (!activeMenu) ? menuStart() : menuRemove();
})