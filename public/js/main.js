window.onscroll = function(){
var header = document.getElementById("header");
var mt = document.querySelector("#marginauto");
if(scrollY > 110){
    header.classList.add("sticky");
    header.classList.remove("container");
    mt.classList.add("margin");
}
else{
    header.classList.add("container");
    header.classList.remove("sticky");
    mt.classList.remove("margin");
}
}


var email = document.querySelector("#email");
email.onkeyup = function(){
    
    if(email.value.length > 0){
        document.querySelector('.mailer').classList.add("apna");
    }
    else if(!email.value){
        document.querySelector('.mailer').classList.remove("apna");
        
    }
}

var element = document.getElementsByClassName("anchor")[0];

element.addEventListener("click",(e)=>{
    var elem = document.querySelector(".nav-active");
    if(elem != null){
        elem.classList.remove("nav-active");
    }
    e.target.classList.add("nav-active");
    
})


document.addEventListener('contextmenu', event => event.preventDefault());





