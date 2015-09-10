
function onBodyLoad(){
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	$("#resultado").html('<span class="glyphicon glyphicon-registration-mark" aria-hidden="true"></span>');

	//inicializa la verificación de la conexión
	//checkConnection();
    
	//Habilita la función del botón atrás.
	document.addEventListener("backbutton", onBackKeyDown, false);
	
	//Habilita la función del botón menú.
	document.addEventListener("menubutton", onMenuKeyDown, false);

}

// Función activada. Botón Menú.
function onMenuKeyDown() {
	alert('No hay opciones de menu disponible por el momento.');
    }

function onBackKeyDown() {
            if( confirm("Realmente desea salir de la aplicación? Para navegar por esta app utilice los enlaces internos.") )
            {
                  navigator.app.exitApp();
            }
		}
		/*
function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'No podemos determinar tu tipo de conexión a una red de datos.';
            states[Connection.ETHERNET] = 'Estás conectado a la red mediante Ethernet connection, vas a ir muy rápido.';
            states[Connection.WIFI]     = 'Estás conectado a la red mediante WiFi connection, vas a ir muy rápido.';
            states[Connection.CELL_2G]  = 'Estás conectado a la red mediante Cell 2G connection, vas a ir muy rápido.';
            states[Connection.CELL_3G]  = 'Estás conectado a la red mediante Cell 3G connection, vas a ir muy rápido.';
            states[Connection.CELL_4G]  = 'Estás conectado a la red mediante Cell 4G connection, vas a ir muy rápido.';
            states[Connection.CELL]     = 'Estás conectado a la red mediante Cell generic connection, podrías experimentar lentitud en la aplicación.';
            states[Connection.NONE]     = '¡Atención! No estás conectado a ninguna red, no podrás cargar la libreta sanitaria. Activa tu conexión WiFi o vuelve en otro momento.';

            alert(states[networkState]);
        }*/