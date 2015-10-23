	var i_log = 0;
function mkLog(text){
	var date = new Date();
	var txt = i_log + " - " + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + ": " + text; 
	i_log++;
	console.log(txt);
	$("#log").append(txt + '<br>');
}
	var existe_db
	var db
	var exite
	var fua_cli
	var fua_precios
	
	var menuOpen = true;
    var menuDiv = "";
	menuDiv = document.querySelector("#menu");


function onBodyLoad(){
	mkLog("Ejecuté el onBodyLoad");
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
    mkLog("Ejecuté el onDeviceReady");
	
	existe_db = window.localStorage.getItem("existe_db");	
	
	db = window.openDatabase("ANDROID", "1.0", "Pedidos Offline", 200000);
	
	if(existe_db == null){
	    mkLog("la BD es null");
		creaDB();
	}else{
		mkLog("la BD está definida");
		cargaDatos();
	}

	//Habilita la función del botón atrás.
	document.addEventListener("backbutton", onBackKeyDown, false);	

	//Habilita la función del botón menú.
	document.addEventListener("menubutton", onMenuKeyDown, false);
	
	//Cargo las empresas guardadas.
	cargaEmpresas();
	
	//Cargo la lista de precios guardadas.
	cargaArticulos();
	
}
function ShowParam(){
	$("#menuPrincial").hide();
	$("#bajada").html('Podrás configurar la conexión al WebService.').show();	
	Vermenu();
}

function ShowMenu(){
	$("#config").hide();
	$("#bajada").hide();
	$("#configurado").hide();
	$("#menuPrincial").show();
}

function ShowDownload(){
					$("#menuPrincial").hide();
					$("#bajada").html('Panel de sincronización.').show();
					$("#download").show();	
	}
/*
function ShowDownload(){
	
	var networkState = navigator.connection.type;
	var states = {};
	states[Connection.UNKNOWN]  = 'No podemos determinar tu tipo de conexión a una red de datos.';
	states[Connection.ETHERNET] = 'Estás conectado a la red mediante Ethernet connection, estamos listo para sincronizar los datos.';
	states[Connection.WIFI]     = 'Estás conectado a la red mediante WiFi, estamos listo para sincronizar los datos.';
	states[Connection.CELL_2G]  = 'Estás conectado a la red mediante Cell 2G connection, estamos listo para sincronizar los datos.';
	states[Connection.CELL_3G]  = 'Estás conectado a la red mediante Cell 3G connection, estamos listo para sincronizar los datos.';
	states[Connection.CELL_4G]  = 'Estás conectado a la red mediante Cell 4G connection, estamos listo para sincronizar los datos.';
	states[Connection.CELL]     = 'Estás conectado a la red mediante Cell generic connection, podrías experimentar lentitud en la sincronización.';
	states[Connection.NONE]     = '¡Atención! tu dispositivo no tiene conexion a datos, no podrás sincronizar, sin embargo podrás seguir trabajando de manera offline.';
	
		if(navigator.network.connection.type == Connection.WIFI){
			//No tenemos conexión
			//alert(states[networkState]);
			var existe = window.localStorage.getItem("ws");
			if(!existe){
					alert('Si bien detectamos que tu dispositivo tiene Wi-Fi, parece que aún no definiste los parámetros de conexión. Andá a la sección configuración y volvé por aquí.');
			}else{
					$("#menuPrincial").hide();
					$("#bajada").html('Panel de sincronización.').show();
					$("#download").show();
			}
		}else{
			// Si tenemos conexión
			//alert(states[networkState]);
			alert('Detectamos que no estás conectado a ninguna red Wi-Fi, conectate a alguna red disponible y volvé por acá');
		}	
	}
*/
function ShowOrder(){
		var existe = window.localStorage.getItem("ws");
		if(!existe){
			console.log('No está definido el WS entonces no puedo mostrar la carga de pedido.');
			alert('No tenés definido los parámetros de conexión. Definí uno y volvé por acá.');
		}else{
			$("#menuPrincial").hide();
			$("#bajada").html('Pedidos de ventas.').show();
			$("#order").show();
			
		}
}	

function HideDownload(){
	$("#download").hide();
	$("#menuPrincial").show();
	}	

function HideOrder(){
	$("#order").hide();
	$("#menuPrincial").show();
	}	
	
function Vermenu(){
		var wsS = window.localStorage.getItem("ws");
		var bdS = window.localStorage.getItem("bd");
		var userS = window.localStorage.getItem("user");
		var passwordS = window.localStorage.getItem("password");
		//alert(wsS);
	if(!wsS){
		mkLog("No de definió WS");
		mkLog(wsS);
		//alert('Es distinto de null');
		$("#config").show();
		
		$("#wsconfig").html('<label for="ws"><small>Web Service</small></label>' +
							'<input type="text" class="form-control" id="ws" name="ws" value="http://Servidor/ITSWS/ItsCliSvrWS.asmx?WSDL">');
		$("#bdconfig").html('<label for="bd"><small>Base de datos</small></label>' +
							'<input type="text" class="form-control" id="bd" name="bd" placeholder="Ej. DEMO">');
		$("#userconfig").html('<label for="user"><small>Usuario</small></label>'+
							  '<input type="text" class="form-control" id="user" name="user" placeholder="USER">');
		$("#passconfig").html('<label for="pass"><small>Password</small></label>' +
							  '<input type="password" class="form-control" id="pass" name="pass" placeholder="PASS">');
	}else{
		mkLog("Ya se definió el WS");
		$("#wsconfig").html('<label for="ws"><small>Web Service</small></label>' +
							'<input type="text" class="form-control" id="ws" name="ws" value="'+ wsS +'">');
		$("#bdconfig").html('<label for="bd"><small>Base de datos</small></label>' +
							'<input type="text" class="form-control" id="bd" name="bd" value="'+ bdS +'">');
		$("#userconfig").html('<label for="user"><small>Usuario</small></label>'+
							  '<input type="text" class="form-control" id="user" name="user" value="'+ userS +'">');
		$("#passconfig").html('<label for="pass"><small>Password</small></label>' +
							  '<input type="password" class="form-control" id="pass" name="pass" value="'+ passwordS +'">');
		$("#configurado").show();
		$("#testeer").show();		
	}
//	alert(window.localStorage.getItem("ws"));	
	
}

// Función activada. Botón Menú.
function onMenuKeyDown() {
	alert('<small>No hay opciones de menu disponible por el momento.</small>');					
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
            states[Connection.ETHERNET] = 'Estás conectado a la red mediante Ethernet connection, estamos listo para sincronizar los datos.';
            states[Connection.WIFI]     = 'Estás conectado a la red mediante WiFi, estamos listo para sincronizar los datos.';
            states[Connection.CELL_2G]  = 'Estás conectado a la red mediante Cell 2G connection, estamos listo para sincronizar los datos.';
            states[Connection.CELL_3G]  = 'Estás conectado a la red mediante Cell 3G connection, estamos listo para sincronizar los datos.';
            states[Connection.CELL_4G]  = 'Estás conectado a la red mediante Cell 4G connection, estamos listo para sincronizar los datos.';
            states[Connection.CELL]     = 'Estás conectado a la red mediante Cell generic connection, podrías experimentar lentitud en la sincronización.';
            states[Connection.NONE]     = '¡Atención! tu dispositivo no tiene conexion a datos, no podrás sincronizar, sin embargo podrás seguir trabajando de manera offline.';
			
			if(navigator.network.connection.type == Connection.NONE){
				// No tenemos conexión
				alert(states[networkState]);
			}else{
				// Si tenemos conexión
				alert(states[networkState]);
			}
			
            //alert(states[networkState]);
        }
		
/*
*Creación de base de datos
*/
function creaDB(){
	db.transaction(creaNuevaDB, errorDB, crearSuccess);
	}

function creaNuevaDB(tx){
	mkLog("Creando base de datos.");
	
	tx.executeSql('DROP TABLE IF EXISTS erp_paises');
	//Creo la empresa ERP_PAISES
	var sql = "CREATE TABLE IF NOT EXISTS erp_paises ( " +
	          "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			  "descripcion VARCHAR(50)," +
			  "sigla VARCHAR(5) )";			  
	tx.executeSql(sql);
	
	//Creo la tabla ERP_EMPRESAS
	tx.executeSql('DROP TABLE IF EXISTS erp_empresas');
	var empresas = "CREATE TABLE IF NOT EXISTS erp_empresas ( " +
		  		   "id VARCHAR(50) PRIMARY KEY, " +
		    	   "descripcion VARCHAR(100)," +
				   "te VARCHAR(30)," +
		           "num_doc VARCHAR(13) )";
	console.log('Creé la tabla ERP_EMPRESAS');			   
	tx.executeSql(empresas);
	
	tx.executeSql('DROP TABLE IF EXISTS erp_pre_ven');
	var precios = "CREATE TABLE IF NOT EXISTS erp_pre_ven ( " +
		  		   "id VARCHAR(50) PRIMARY KEY, " +
		    	   "fk_erp_articulos VARCHAR(50)," +
		    	   "des_art VARCHAR(40)," +				   
		           "precio NUMERIC(10,4) )";
	tx.executeSql(precios);
	
	//Marco a la aplicación para que sepa que la base de datos ya está creada.
	window.localStorage.setItem("existe_db", 1);
	
	tx.executeSql("INSERT INTO erp_paises (id, descripcion, sigla) VALUES (1, 'Argentina', 'AR')" );
	tx.executeSql("INSERT INTO erp_paises (id, descripcion, sigla) VALUES (2, 'Brasil', 'BR')" );
	tx.executeSql("INSERT INTO erp_paises (id, descripcion, sigla) VALUES (3, 'Bolivia', 'BO')" );
	tx.executeSql("INSERT INTO erp_paises (id, descripcion, sigla) VALUES (4, 'Colombia', 'CO')" );
	tx.executeSql("INSERT INTO erp_paises (id, descripcion, sigla) VALUES (5, 'Chile', 'CH')" );
	tx.executeSql("INSERT INTO erp_paises (id, descripcion, sigla) VALUES (6, 'Ecuador', 'EC')" );
	tx.executeSql("INSERT INTO erp_paises (id, descripcion, sigla) VALUES (7, 'Paraguay', 'PY')" );
	tx.executeSql("INSERT INTO erp_paises (id, descripcion, sigla) VALUES (8, 'Uruguay', 'UY')" );
}

function crearSuccess(){
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
		selector.append('<tr>' +
							'<th scope="row">' + paises.id + '</th>' +
							'<td>' + paises.descripcion + '</td>' +
							'<td>' + paises.sigla + '</td>' +
						'</tr>');
	}
}


function cargaEmpresas(){
	db.transaction(cargaCliente, errorDB);
}

function cargaCliente(tx){
	console.log("Cargando registros de la base de datos.");
	tx.executeSql('select * from erp_empresas', [], cargaClienteSuccess, errorDB);
}

function cargaClienteSuccess(tx, results){
	console.log("Recibidos de la base de datos" + results.rows.length + " registros");
	if(results.rows.length == 0){
		console.log("La tabla está vacía.");
		alert("La tabla está vacía.");
	}else{		
			var Datos = [];
			var selector = $('#aca');
			for(var i=0; i<results.rows.length; i++){
				var empresas = results.rows.item(i);
				Datos[i] = empresas.descripcion;
				//console.log('Esto es la descripcion: '+empresas.descripcion);
				//console.log('Esto es el areeglo: ' + Datos[i]);
				
				/*
				selector.append('<tr>' +
									'<th scope="row">' + empresas.id + '</th>' +
									'<td>' + empresas.descripcion + '</td>' +
								'</tr>');
				*/
				
			}
			
			//alert(Datos);
			
$(function() {
    $( "#tags" ).autocomplete({
      source: Datos
    });
  });			
	}	
}



function cargaArticulos(){
	db.transaction(cargaArt, errorDB);
}

function cargaArt(tx){
	console.log("Cargando pedidos de la base de datos.");
	tx.executeSql('select * from erp_pre_ven', [], cargaArtSuccess, errorDB);
}

function cargaArtSuccess(tx, results){
	console.log("Recibidos de la base de datos" + results.rows.length + " registros");
	if(results.rows.length == 0){
		console.log("La tabla precios de ventas está vacía.");
		alert("La tabla precios de ventas está vacía.");
	}else{		
			var Art = [];
			var selector = $('#aca');
			for(var i=0; i<results.rows.length; i++){
				var art = results.rows.item(i);
				Art[i] = art.des_art;	
			}
			
			$(function() {
				$( "#erpart" ).autocomplete({
				  source: Art
				});
			  });			
	}	
}

/*
	*Guardando datos en local storage
*/

function submitForm(){
	var _webs = $("[name='ws']").val();
	var _base = $("[name='bd']").val();
	var _users = $("[name='user']").val();
	var _pass = $("[name='pass']").val();
	
	var ws = window.localStorage.setItem("ws", _webs);
	var bd = window.localStorage.setItem("bd", _base);
	var user = window.localStorage.setItem("user", _users);
	var password = window.localStorage.setItem("password", _pass);
	alert('Los datos se han guardado correctamente.');
	
	$("#config").hide();
    location.reload();
	return false;
}

function Cleaner(){
	
	if( confirm("Realmente deseas borrar los datos de conexión al WebService? Tené en cuenta que no vas a poder cargar o generar pedidos ni sincronizar datos.") )
            {
			var ws = window.localStorage.setItem("ws", "");
			var bd = window.localStorage.setItem("bd", "");
			var user = window.localStorage.setItem("user", "");
			var password = window.localStorage.setItem("password", "");
			$("#configurado").hide();
			$("#testeer").hide();
			$("#config").show();
			mkLog('Borraste los datos de conexión');
			alert('Borraste los datos de conexión');
			location.reload();
			}
}

function datosConexion(){
	alert('Este es el WebService: ' + window.localStorage.getItem("ws"));
	alert('Esta es base de datos: ' + window.localStorage.getItem("bd"));
	alert('Este es el Usuario: ' + window.localStorage.getItem("user"));
	alert('Este es el Password: ' + window.localStorage.getItem("password"));

	//$('#output').html("Ws: " + window.localStorage.getItem("ws") + "<br>" +
	//					"BD: " + window.localStorage.getItem("bd") + "<br>" +
	//					"USer: " + window.localStorage.getItem("user") + "<br>" +
	//					"Pass: " + window.localStorage.getItem("password") + "<br>");
}
	