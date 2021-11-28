//CSS Style
import "../css/style.css";

//Importing JavaScript Code
import CronometerService from "./services/services";
import LapObjectConstructor from "./model/Lap";
import TimeObjectConstructor from "./model/Time";
require("./darkLightTheme/darkLightTheme");
require("./themesColors/themesColors");

const chronometerService = new CronometerService();

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

    await chronometerService.postLap(LapObjectConstructor(currentLapCounter, "Lap", min, sec, miliSec));

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
        await chronometerService.sendTime(TimeObjectConstructor(min, sec, miliSec));
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

    await chronometerService.sendTime(TimeObjectConstructor("0", "0", "00"));
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

