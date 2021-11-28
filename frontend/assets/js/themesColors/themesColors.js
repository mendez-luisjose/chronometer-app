//JS Code que aperece y desaparece el cuadro para cambiar el color del tema del Cronometro
const botonPalette = document.querySelector(".palette-button");
const themesContainer = document.querySelector(".theme-colors__container");

botonPalette.addEventListener("click", () => {
    themesContainer.classList.toggle("open");
})

//Codigo para cambiar el color
const buttons = document.querySelectorAll(".btn");
let root = document.querySelector(":root");

//Codigo para colocar tema si ya el usuario lo habia seleccionado antes
let selectedColor = localStorage.getItem("color");
let selectedTema = localStorage.getItem("selectedColor");


//Codigo por si ya el usuario habia escogido un tema, para guardarlo y colocarlo
if(selectedColor) {
    root.style.setProperty("--hue-color", selectedColor);
    document.querySelector(".active").classList.remove("active");
    document.getElementById(`${selectedTema}`).classList.add("active");
}

//Codigo que al seleccionar el boten del tema, cambia el color del Reloj
for(var button of buttons) {
    button.addEventListener("click", e => {
        let target = e.target;

        let open = document.querySelector(".open");
        if(open) open.classList.remove("open");

        document.querySelector(".active").classList.remove("active");
        target.classList.add("active");

        let selectColor = target.getAttribute("color");
        console.log(selectColor);

        if(selectColor == "blue") {
            root.style.setProperty("--hue-color", 240);
            localStorage.setItem("color", 240);
            localStorage.setItem("selectedColor", "blue");
        } else if (selectColor == "orange") {
            root.style.setProperty("--hue-color", 25);
            localStorage.setItem("color", 25);
            localStorage.setItem("selectedColor", "orange");
        } else if (selectColor == "green") {
            root.style.setProperty("--hue-color", 154);
            localStorage.setItem("color", 154);
            localStorage.setItem("selectedColor", "green");
        } else if (selectColor == "pink") {
            root.style.setProperty("--hue-color", 335);
            localStorage.setItem("color", 335);
            localStorage.setItem("selectedColor", "pink");
        }
    })
}