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

export default CronometerService;