// solo esta el js del boton nomas por ahora

const d = document,
    menuToggle = d.getElementById("btn-toggle-menu"),
    navLinks = d.querySelector(".items-main-menu"),
    btnMenuMore = d.getElementById("btn-menu-more"),
    MenuMore = d.querySelector(".submenu"),
    btnCloseMenuMore=d.getElementById("close-menu-more");

const blockModalMenuMore=function(){
    // document.body.addEventListener
}

const takeInformation = async () => {
    //const peittion = fetch()
};

d.addEventListener("DOMContentLoaded", () => {
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));

    btnMenuMore.addEventListener("click", () => {
        MenuMore.classList.toggle("active");
        if (!MenuMore.classList.contains("size")) {
            MenuMore.classList.add("size");
            MenuMore.style.height = document.documentElement.scrollHeight + 'px';
        }
    });
    btnCloseMenuMore.addEventListener("click",()=>MenuMore.classList.toggle("active"));
    

});
