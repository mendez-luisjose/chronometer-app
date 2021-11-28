/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/assets/js/darkLightTheme/darkLightTheme.js":
/*!*************************************************************!*\
  !*** ./frontend/assets/js/darkLightTheme/darkLightTheme.js ***!
  \*************************************************************/
/***/ (() => {

/*==================== DARK/LIGHT THEME ====================*/
const themeButton = document.querySelector('.dark-button')
const darkTheme = 'dark-theme';
const iconTheme = 'bxs-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', e => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


/***/ }),

/***/ "./frontend/assets/js/model/Lap.js":
/*!*****************************************!*\
  !*** ./frontend/assets/js/model/Lap.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const LapObjectConstructor = (number, label, min, sec, miliSec) => {
  const lap = {
      "number": number,
      "label": label,
      "time": `${min} : ${sec} : ${miliSec}`
  }

  return lap
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LapObjectConstructor);


/***/ }),

/***/ "./frontend/assets/js/model/Time.js":
/*!******************************************!*\
  !*** ./frontend/assets/js/model/Time.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const TimeObjectConstructor = (minutes, seconds, miliseconds) => {
  const time = {
      "minutes": minutes,
      "seconds": seconds,
      "miliseconds": miliseconds
  }

  return time
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TimeObjectConstructor);

/***/ }),

/***/ "./frontend/assets/js/services/services.js":
/*!*************************************************!*\
  !*** ./frontend/assets/js/services/services.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//Class that contains all the fetch requets, GET, PUT, DELETE and POST
class CronometerService {
    constructor() {
        this.URl = `http://localhost:${process.env.PORT}/api`;
    }

    //Fetch GET request, to get all the laps
    async getLaps() {
        try {
            const response = await fetch(`${this.URl}/laps`);    
            const laps = await response.json();
            return laps;
        } catch {
            alert("Hubo un Error al Recibir Los Lapsos, Revisa tu Conexion te Internet");
        }
    }

    //Fetch POST request, to save one single lap
    async postLap(lap) {
        try {
            const res = await fetch(`${this.URl}/laps`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(lap)
            });
            const data = await res.json();
            console.log(data);
        } catch {
            alert("Hubo un Error al Guardar el Lapso de Tiempo, Revisa tu Conexion te Internet");            
        }
    }

    //Fetch DELETE request, to delete one single task
    async deleteLaps() {
        try {
            const res = await fetch(`${this.URl}/laps`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data);
        } catch {
            alert("Hubo un Error al Eliminar los Lapsos de Tiempo, Revisa tu Conexion te Internet");            

        }
    }

    //Fetch GET request, to get the time of the Cronometer storaged from the MongoDB Database
    async getTime() {
        try {
            const response = await fetch(`${this.URl}/time`);    
            const time = await response.json();
            return time;
        } catch {
            alert("Hubo un Error al Recibir el Tiempo, Revisa tu Conexion te Internet");
        }
    }

    //Fetch PUT request, to send the time of the cronometer to the MongoDB Database
    async sendTime(time) {
        try {
            const res = await fetch(`${this.URl}/time`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify(time)
            });
            const data = await res.json();
            console.log(data);
        } catch {
            alert("Hubo un Error al Enviar el Tiempo, Revisa tu Conexion te Internet");            

        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CronometerService);

/***/ }),

/***/ "./frontend/assets/js/themesColors/themesColors.js":
/*!*********************************************************!*\
  !*** ./frontend/assets/js/themesColors/themesColors.js ***!
  \*********************************************************/
/***/ (() => {

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

/***/ }),

/***/ "./frontend/assets/css/style.css":
/*!***************************************!*\
  !*** ./frontend/assets/css/style.css ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************************!*\
  !*** ./frontend/assets/js/script.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ "./frontend/assets/css/style.css");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/services */ "./frontend/assets/js/services/services.js");
/* harmony import */ var _model_Lap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/Lap */ "./frontend/assets/js/model/Lap.js");
/* harmony import */ var _model_Time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/Time */ "./frontend/assets/js/model/Time.js");
//CSS Style


//Importing JavaScript Code



__webpack_require__(/*! ./darkLightTheme/darkLightTheme */ "./frontend/assets/js/darkLightTheme/darkLightTheme.js");
__webpack_require__(/*! ./themesColors/themesColors */ "./frontend/assets/js/themesColors/themesColors.js");

const chronometerService = new _services_services__WEBPACK_IMPORTED_MODULE_1__["default"]();

//Query Selector
const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart-button");
const lapButton = document.querySelector(".lap-button");
const minutesField = document.querySelector(".minutes");
const secondsField = document.querySelector(".seconds");
const miliSecondsField = document.querySelector(".miliseconds");
const lapsField = document.querySelector(".laps");
const resetButton = document.querySelector(".countdown__clean-lap-history-button");
const footerField = document.querySelector("footer");


//Variable que ayuda a indicar si el cronometro esta pausando o corriendo
let isPlay = false;
let min = 0;
let minCounter;
let sec = 0;
let secCounter;
let miliSec = 0;
let miliSecCounter;
let lapCounter = 1;
//Funcion que Aparece y Desaparece los Botones de Reinicar y Lap al Presionar el Boton de Start
const toggleFunction = () => {
    restartButton.classList.toggle("open-start");
    lapButton.classList.toggle("open-start");
}


//Funcion que guardar el tiempo del cronometro y lo agrega a la lista del Lap
const lapGenerator = async () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const lapPhrase = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-historial");
    number.setAttribute("class", "lap-number");
    lapPhrase.setAttribute("class", "lap-phrase");
    timeStamp.setAttribute("class", "lap-timer");

    number.innerText = `${lapCounter++}`;
    lapPhrase.innerText = "Lap";
    timeStamp.innerText = `${min} : ${sec} : ${miliSec}`;

    li.append(number, lapPhrase, timeStamp);
    lapsField.append(li);

    resetButton.classList.add("open-start");
    footerField.classList.add("show");

    let currentLapCounter = lapCounter - 1;

    await chronometerService.postLap((0,_model_Lap__WEBPACK_IMPORTED_MODULE_2__["default"])(currentLapCounter, "Lap", min, sec, miliSec));

}

//Funcion que arranca el reloj, en donde los minutos, segundos y milisegundos empiezan a moverse
startButton.addEventListener("click", async () => {
    if (isPlay) {
        document.querySelector(".start-button h2").innerText = "Empezar";
        toggleFunction();
        clearInterval(minCounter);
        clearInterval(secCounter);
        clearInterval(miliSecCounter);
        isPlay = false;
        await chronometerService.sendTime((0,_model_Time__WEBPACK_IMPORTED_MODULE_3__["default"])(min, sec, miliSec));
    } else {
        document.querySelector(".start-button h2").innerText = "Pausar";
        toggleFunction();

        minCounter = setInterval(() => {
            if (min <= 9) {
                minutesField.innerText = `0${++min}`;
            } else {
                minutesField.innerText = `${++min}`;
            }
            
        }, 60000)

        secCounter = setInterval(() => {
            if (sec == 59) {
                sec = 0;
            }

            if (sec < 9) {
                secondsField.innerText = `0${++sec}`;
            } else {
                secondsField.innerText = `${++sec}`;
            }
        }, 1000)


        miliSecCounter = setInterval(() => {
            if (miliSec >= 1000) {
                miliSec = 0;
            }
            let ahora = new Date();
            miliSec = ahora.getMilliseconds();
            miliSecondsField.innerText = ` ${++miliSec}`;
        }, 10)

        isPlay = true;
    }
})

//Funcion que resetea el cronometro, colocando los minutos, segundos y milisegundos en su valor por default, *00*
restartButton.addEventListener("click", async () => {
    if (isPlay) {
        document.querySelector(".start-button h2").innerText = "Empezar";
        isPlay = false;
    }
    restartButton.classList.remove("open-start");
    lapButton.classList.remove("open-start");

    min = 0;
    sec = 0;
    miliSec = 0;

    clearInterval(minCounter);
    clearInterval(secCounter);
    clearInterval(miliSecCounter);

    minutesField.innerText = "00"
    secondsField.innerText = "00";
    miliSecondsField.innerText = "00";

    await chronometerService.sendTime((0,_model_Time__WEBPACK_IMPORTED_MODULE_3__["default"])("0", "0", "00"));
})

//Al hacer click en el Lap Button, agrega el tiempo del cronometro a la lista de Laps
lapButton.addEventListener("click", lapGenerator);

//Al hacer click en el boton de Borrar, se borran los laps de la lista
resetButton.addEventListener("click", async () => {
    lapsField.innerHTML = "";
    resetButton.classList.remove("open-start");
    lapCounter = 1;
    footerField.classList.remove("show");

    await chronometerService.deleteLaps();
})


//Funcion que guardar el tiempo del cronometro y lo agrega a la lista del Lap
const lapConstructorFromDataBase = async (lap) => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const lapPhrase = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-historial");
    number.setAttribute("class", "lap-number");
    lapPhrase.setAttribute("class", "lap-phrase");
    timeStamp.setAttribute("class", "lap-timer");

    number.innerText = `${lap.number}`;
    lapPhrase.innerText = `${lap.label}`;
    timeStamp.innerText = `${lap.time}`;

    li.append(number, lapPhrase, timeStamp);
    lapsField.append(li);

    resetButton.classList.add("open-start");
    footerField.classList.add("show");

    lapCounter++
}

//Function that receive all the laps that are stored on the MongoDB Database
const generateLapsFromTheDatabase = async () => {
    try {
        //Fetch that return all the laps storage from the MongoDB Database
        let laps = await chronometerService.getLaps();
        if (laps.length > 0) {

            for (let i = 0; i < laps.length; i++) {
                lapConstructorFromDataBase(laps[i]);
            }

        } else {
            console.log("No hay ningun Lap guardada en la Base de Datos");
        }

    } catch {
        alert("Hubo un Error al Recibir los Laps, Revisa tu Conexion de Internet");
    }
}

const setChronometerTimeFromDataBase = async () => {
    try {
        //Fetch that return the chronometer time storage from the MongoDB Database
        let time = await chronometerService.getTime();
        if (time.length > 0) {
            min = `${time[0].minutes}`;
            sec = `${time[0].seconds}`;
            miliSec = `${time[0].miliseconds}`;

            if (time[0].minutes <= 9) {
                minutesField.textContent  = `0${time[0].minutes}`;
            } else {
                minutesField.textContent  = `${time[0].minutes}`;
            }

            if (time[0].seconds <= 9) {
                secondsField.textContent = `0${time[0].seconds}`;
            } else {
                secondsField.textContent = `${time[0].seconds}`;
            }

            miliSecondsField.textContent = `${time[0].miliseconds}`;


        } else {
            console.log("No hay ningun Tiempo guardada en la Base de Datos");
        }

    } catch {
        alert("Hubo un Error al Recibir el Tiempo, Revisa tu Conexion de Internet");
    }
}

//Functions that set the laps and the chronometer time from the MongoDB Database
generateLapsFromTheDatabase();
setChronometerTimeFromDataBase();


//Query Selector
const container = document.querySelector(".container");
const spinner = document.querySelector(".div-spinner-container");

const showCronometerApp = () => {
    container.style.display = "block";
    spinner.style.display = "none";
}

const animationTime = 3000;

//setTimeout that after 3 seconds, the css loader animation disappear and it shows the app-todo ui
setTimeout(showCronometerApp, animationTime);


})();

/******/ })()
;
//# sourceMappingURL=index.js.map