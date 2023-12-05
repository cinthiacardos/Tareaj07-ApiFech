console.log("TAREA APIFECH")

document.getElementById('leerUsuarios').addEventListener('click', function primeraSolicitud() {
    let url = 'https://reqres.in/api/users?delay=3';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const fechaHoraSolicitud = new Date();

            localStorage.setItem('datosUsuario', JSON.stringify(data.data));
            localStorage.setItem('fechaHoraSolicitud', fechaHoraSolicitud.toISOString());
            console.log("almacenado en el local-storage");
            console.log("Datos de Solicitud:  ", fechaHoraSolicitud);

            mostrarData(data);
            document.getElementById('leerUsuarios').addEventListener('click', checkLocalStorage);
        })
        .catch(error => console.error('Error al obtener datos de la API:', error));
});

const mostrarData = (data) => {
    console.log(data.data)   
        
    let body = '';

    for (let i = 0; i < data.data.length; i++) {
        body += `<tr>
        <td>${data.data[i].id}</td>
        <td>${data.data[i].email}</td>
        <td>${data.data[i].first_name}</td>
        <td>${data.data[i].last_name}</td>
        <td><img src= "${data.data[i].avatar}" alt = "avatar" class="avatar-img"></td>
        </tr>`;
    }
    document.getElementById('data').innerHTML = body;
    document.getElementById('tablaUsuarios').style.display = 'block';
    }
    setTimeout(() => {
        limpiarDatos();
    }, 60000);

const limpiarDatos = () => {
    // Limpiar datos en el Local Storage y ocultar la tabla
    localStorage.removeItem('datosUsuarios');
    localStorage.removeItem('fechaHoraSolicitud');
        console.log("datos eliminados del local storage")


    }

const checkLocalStorage = () => {

    if (!localStorage.getItem('fechaHoraSolicitud')) {
        console.log('No hay fecha de solicitud en el localStorage. Realizando segunda solicitud.');
        realizarSegundaSolicitud();

    } else {
        const fechaHoraPrimeraSolicitud = new Date(localStorage.getItem('fechaHoraSolicitud'));
        const ahora = new Date();

        const diferenciaTiempo = ahora.getTime() - fechaHoraPrimeraSolicitud.getTime();
        const diferenciaEnMinutos = diferenciaTiempo / (1000 * 60);

        if (diferenciaEnMinutos < 1) {
            const datosAlmacenados = JSON.parse(localStorage.getItem('datosUsuario'));
            console.log("Menos de 1 minuto desde la primera solicitud.");
            console.log("leyendo datos del local storage");
            
            console.log("Mostrando datos en el DOM:", datosAlmacenados);
        } else {
            console.log("Ha pasado más de 1 minuto desde la primera solicitud. Realizando segunda solicitud.");
            realizarSegundaSolicitud();
        }
    }
}

const realizarSegundaSolicitud = () => {
    const url = 'https://reqres.in/api/users?delay=3';
        console.log("leyendo ")
    fetch(url)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('datosUsuarios', JSON.stringify(data.data));
            localStorage.setItem('fechaHoraSolicitud', new Date().toISOString());

            console.log('Nueva solicitud realizada y datos almacenados:', data.data);
            console.log(data);

            mostrarData(data.data);
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
}
