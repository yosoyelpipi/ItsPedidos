function onBodyLoad(){
	mkLog("Aplicación cargada y lista.");
	document.addEventListener("deviceready", onDeviceReady, false);
}

var i_log = 0;
function mkLog(text){
	var date = new Date();
	var txt = i_log + " - " + date.getHours() + "-" + date.getMinutes() * "-" + date.getSeconds() + ": " + text; 
	i_log++;
	console.log(txt);
}
	var existe_db
	var db

function onDeviceReady(){
	mkLog("Aplicación cargada y lista.");
	$("#muestroresultado").html('<span class="glyphicon glyphicon-registration-mark" aria-hidden="true"></span>');
	
	existe_db = window.localStorage.getItem("existe_db");
	db = window.openDatabase("erp_paises", "1.0", "Paises", 200000);
	
	if(existe_db == null){
		crearDB();
	}else{
		cargaDatos();
	}
	
	//inicializa la verificación de la conexión
	checkConnection();
    
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
		
function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'No podemos determinar tu tipo de conexión a una red de datos.';
            states[Connection.ETHERNET] = 'Estás conectado a la red mediante Ethernet connection, vas a poder realizar el test de conexion.';
            states[Connection.WIFI]     = 'Estás conectado a la red mediante WiFi, vas a poder realizar el test de conexion.';
            states[Connection.CELL_2G]  = 'Estás conectado a la red mediante Cell 2G connection, vas a poder realizar el test de conexion.';
            states[Connection.CELL_3G]  = 'Estás conectado a la red mediante Cell 3G connection, vas a poder realizar el test de conexion.';
            states[Connection.CELL_4G]  = 'Estás conectado a la red mediante Cell 4G connection, vas a poder realizar el test de conexion.';
            states[Connection.CELL]     = 'Estás conectado a la red mediante Cell generic connection, podrías experimentar lentitud en la medición.';
            states[Connection.NONE]     = '¡Atención! tu dispositivo no tiene conexion a datos, no podrás realizar el test. Activa tu conexión WiFi o vuelve en otro momento.';
			
			if(navigator.network.connection.type == Connection.NONE){
				// No tenemos conexión
				alert('No tenés conexión LTA.');
				$("#pedon").fadeout();
				$("#pedoff").html('<span class="glyphicon glyphicon-volume-off" aria-hidden="true"></span> Puedo agregar pedidos e modo off line.');
			}else{
				// Si tenemos conexión
				alert('Vamoooooooooooossssss.');
				$("#pedoff").fadeout();
				$("#pedon").html('<span class="glyphicon glyphicon-signal" aria-hidden="true"></span> Ahora puedo sincronizar la lista de precios.');
			}
			
            alert(states[networkState]);
        }
		
/*
*Creación de base de datos
*/
function crearDB(){
	db.transaction(crearNuevaDB, errorDB, crearSuccess);
	}

function crearNuevaDB(txt){
	tx.executeSql('DROP TABLE IF EXISTS erp_paises');
	var sql= "CREATE TABLE IF NOT EXISTS erp_paises ( "+
	         "id INTEGER PRIMARY KEY AUTOINCREMENT, "+
			 "descripcion VARCHAR(50),"+
			 "sigla VARCHAR(5) )";
	tx.executeSql(sql);

	tx.executeSql("INSERT INTO erp_paises (descripcion, sigla) VALUES ('Argentina', 'AR')");
	tx.executeSql("INSERT INTO erp_paises (descripcion, sigla) VALUES ('Brasil', 'BR')");
	tx.executeSql("INSERT INTO erp_paises (descripcion, sigla) VALUES ('Bolivia', 'BO')");
	tx.executeSql("INSERT INTO erp_paises (descripcion, sigla) VALUES ('Colombia', 'CO')");
}

function crearSuccess(){
	existe_db = window.localStorage.setItem("existe_db", 1);
	cargaDatos();
}

function errorDB(err){
	mkLog("Error procesando SQL:" + err.code);
	navigator.notification.alert("Error procesando SQL:" + err.code);
}

/*
*Cargar desde la base de datos
*/
function cargaDatos(){
	db.transaction(cargaRegistros, errorDB);
}

function cargaRegistros(tx){
	mkLog("Cargando registros de la base de datos.");
	tx.executeSql('select * from erp_paises', [], cargaDatosSuccess, errorDB);
}

function cargaDatosSuccess(tx, results){
	mkLog("Recibidos de la base de datos" + results.rows.length + " registros");
	if(results.rows.length == 0){
		mkLog("La tabla está vacía.");
		navigator.notification.alert("La tabla está vacía.");
	}
	
	for(var i=0; i<results.rows.length; i++){
		var paises = results.rows.item(i);
		var selector = $('#muestroresultado');
		selector.append('<p>El país es ' + paises.descripcion + '</p>' +
		                '<p>La sigla es ' + paises.sigla + '</p>');
	}
	
}	