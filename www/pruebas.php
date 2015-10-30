<?php
function GrabarArchivo($XMLData,$nombre){
							$now = date('Ymd-H-i-s');
							$fp = fopen($nombre.$now.".xml", "a");
							fwrite($fp, $XMLData. PHP_EOL);
							fclose($fp);	
						}
$ws = "http://200.55.245.171:3000/ITSWS/ItsCliSvrWS.asmx?WSDL";
$bd = "LM_10_09_14";
$user = "administrador";
$pass = "12348";
						
require_once('lib/nusoap.php');
$client = new nusoap_client($ws,true);
	$sError = $client->getError();
	if ($sError) {
		echo json_encode(array("ItsLoginResult"=>1, "motivo"=>"No se pudo conectar al WebService indicado."));	
		//echo '<span class="label label-danger"> No se pudo realizar la conexión '.$sError.'</span>';
	}else{
		$login = $client->call('ItsLogin', array('DBName' => $bd, 'UserName' => $user, 'UserPwd' => $pass, 'LicType'=>'WS') );			
		$error = $login['ItsLoginResult'];
		$session = $login['UserSession'];

		if($error){
					$LastErro = $client->call('ItsGetLastError', array('UserSession' => $session) );
					utf8_encode($LastErro['Error']);
					echo json_encode(array("ItsLoginResult"=>$error, "motivo"=>$err));
				}else{
					//echo json_encode(array("ItsLoginResult"=>$error, "session"=>$session));
//Recupero las empresas:
//"EMAIL = '".$email."'"
					$empresas = $client->call('ItsGetData', array('UserSession' => $session, 'ItsClassName' => 'ERP_EMPRESAS', 'RecordCount' => '2', 'SQLFilter'=>'CLIENTE=1'  , 'SQLSort'=> '') );
					$ItsGetDataResult = $empresas['ItsGetDataResult'];
					$LastErro = $client->call('ItsGetLastError', array('UserSession' => $session) );
					//echo $err = utf8_encode($LastErro['Error']);
					$XMLData = $empresas['XMLData'];

					$erp_empresas=simplexml_load_string($XMLData) or die("Error: Cannot create object");

					//$array = json_decode(json_encode($erp_empresas),1);
					$array = json_decode(json_encode($erp_empresas),1);
				
					//Ahora comienzo a recorrer el XML para mostrar los atributos por pantalla.
					$langs = $array['ROWDATA']['ROW'];
					print_r($langs);
					//echo sizeof($langs);
					$data = array();
					
					$medida = sizeof($langs);
					
					echo '<h1>Esto es la medida:'.$medida.'</h1>';
					//Mediante el bucle for puedo recorrer todo el XML.
					for ($i=0; $i<$medida; $i++) {
						echo '<h1>Este es el valor de i: '.$i.'</h1>';
						//echo "<br>Empresas: ".$langs[$i]['@attributes']['ID']."- ".$langs[$i]['@attributes']['DESCRIPCION']." - ".$langs[$i]['@attributes']['WEBSITE']."<br>";
					if($medida == 1){
						$data[] = array('ID'=>$langs['@attributes']['ID'], 'DESCRIPCION'=>$langs['@attributes']['DESCRIPCION'], 'TE'=>$langs['@attributes']['TE'], 'EMAIL'=>$langs['@attributes']['NUM_DOC']);		
					}else{
						$data[] = array('ID'=>$langs[$i]['@attributes']['ID'], 'DESCRIPCION'=>$langs[$i]['@attributes']['DESCRIPCION'], 'TE'=>$langs[$i]['@attributes']['TE'], 'EMAIL'=>$langs[$i]['@attributes']['NUM_DOC']);	
					}
					//echo json_encode(array("ItsLoginResult"=>$error, "motivo"=>$err));
						/*$datos = 	array('ID'=>$langs[$i]['@attributes']['ID'],
										  'DESCRIPCION'=>$langs[$i]['@attributes']['DESCRIPCION'],
										  'TE'=>$langs[$i]['@attributes']['TE'],
										  'email'=>$langs[$i]['@attributes']['NUM_DOC']
											);
						$salida[] = $datos;
						*/
/*
echo json_encode(array(
						array('ID'=>$langs[$i]['@attributes']['ID'],
							  'DESCRIPCION'=>$langs[$i]['@attributes']['DESCRIPCION'],
							  'edad'=>22,
							  'email'=>'nombre1@lclis.com',
							  'mascotas'=>array('gato','perro','araña')
								)
						)
				);
*/		
					}
					//ANDA: echo json_encode($salida);
					//echo json_encode(array("ItsLoginResult"=>1, "Data"=>$salida));
					echo json_encode(array("ItsLoginResult"=>$ItsGetDataResult, "Data"=>$data));
					$LogOut = $client->call('ItsLogout', array('UserSession' => $session) );	
					
							/*$XML = simplexml_load_string($XMLData) or die("Error: Cannot create object");
							$array = json_decode( json_encode($XML) , 1);
							//Obtengo la cantidad de resultado que tiene el XML		
							//$cantidad = sizeof($array['ROWDATA']);
							print_r($array);
							*/
				}				
	}
?>