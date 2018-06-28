// Variaveis globais de projeto ===============

   // FRAMEWORK ===============================
    var myApp;
    var $$;
    var mainView;
   //==========================================
   // Funcoes internas ========================
    var sucessoLocAtual;
    var falhaLocAtual;
    var abrePopOverHistorico;
   //==========================================
   // GERAL ===================================
    var latitudeAtual;
    var longitudeAtual;

    var mapCadastro;
    var markersCadastro = [];
    var cidadeMarcada = "";

    var directionsDisplay;
    var directionsService;
    var indiceHistoricoClicado;
    var arrayHistoricosNaTela = new Array();
   //==========================================

//=============================================

// Sempre que inicia ele executa o que está aqui dentro (Manipula eventos)
$(document).ready(function(){

   // INICIALIZA FRAMEWORK E SUAS VIEWS ________________________________

    $$ = Dom7;
    myApp = new Framework7({
        root: '#app',
        name: 'Agrofer',
        id: 'app.agrofer.mobile',
        theme: 'md',
        smartSelect: {
            closeOnSelect: true,
            sheetCloseLinkText: "Selecione o meio de transporte a ser usado",
        }
    });

    iniciaViews();

   //___________________________________________________________________
});

function pegaLocAtual(tela){ // Pega loc Atual

    sucessoLocAtual = function(pos){
        
        latitudeAtual = pos.coords.latitude;
        longitudeAtual = pos.coords.longitude;

        if(tela == "cadastro"){
            initMapCadastroEndereco();
        }else if(tela == "rota"){
            initMapConsultaRota();
        }else if(tela == "historico"){
            calculaRotaHistorico();
        }
        
    }
    falhaLocAtual = function(err){
        myApp.preloader.hide();
        myApp.popover.close("#popOverNovaRotaHistorico");
        notificacao("Falha ao obter localização atual ! <br> Verifique se sua localização está ativada", 4000);
    }

    var geoOptions = {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 15000
    };
    myApp.preloader.show();
    navigator.geolocation.getCurrentPosition( sucessoLocAtual, falhaLocAtual, geoOptions );
 }
// CADASTRO =========================================================================================
    function initMapCadastroEndereco() { // Inicia mapa com pos atual

        mapCadastro = new google.maps.Map(document.getElementById('mapCadastro'), {
        zoom: 10,
        center: {lat: latitudeAtual, lng: longitudeAtual}
        });

        var geocoder = new google.maps.Geocoder;

        document.getElementById('submitCadastro').addEventListener('click', function() {
            geocodeAddress(geocoder, mapCadastro);  
        });

        myApp.preloader.hide();
        $("#inputCadastro").val("");
        adicionaTela(mainView, "page2");
     }

    function geocodeAddress(geocoder, resultsMap) { // Encontra no mapa e marca o endereco ou coordenada digitada

        var address = document.getElementById('inputCadastro').value;

        geocoder.geocode({'address': address}, function(results, status) {

            if (status === 'OK') {

                apagaMarcadores();
                cidadeMarcada = "";
                resultsMap.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });

                console.log(results);

                markersCadastro.push(marker);
                cidadeMarcada = results[0].formatted_address;

            } else {
                notificacao("Endereço digitado não encontrado", 2500);
            }
        });
     }

    function apagaMarcadores() { // Remove todos os marcadores do mapa
        for (var i = 0; i < markersCadastro.length; i++) {
            markersCadastro[i].setMap(null);
        }
        markersCadastro = [];
     }

    function salvaEndereco(){ // Salva nome da cidade no DB

        myApp.dialog.confirm("Deseja cadastrar o endereco/cidade ?", cidadeMarcada, function(){
            var jaCadastrada = false;
            for(var a in enderecos){
                if(cidadeMarcada == enderecos[a]){
                    jaCadastrada = true;
                }
            }

            if(jaCadastrada){
                notificacao("Endereço/Cidade já está cadastrada", 2500);
            }else{
                enderecos.push(cidadeMarcada);
                salvarEnderecos();
                notificacao("Endereço/Cidade Cadastrado com Sucesso !", 3000);
                adicionaTela(mainView, "page1");
            }

        }, null);
     }
//===================================================================================================
// ROTA =============================================================================================
    function initMapConsultaRota(){

        directionsDisplay = new google.maps.DirectionsRenderer;
        directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('mapRota'), {
          zoom: 7,
          center: {lat: latitudeAtual, lng: longitudeAtual}
        });

        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

        // var control = document.getElementById('floating-panel');
        // control.style.display = 'block';
        // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);


       // Preenche os SELECTS =====================
        $("#selectPartida").html("<option value='1' selected> Minha Localização Atual </option>");
        $("#selectDestino").html("");
        for(var a in enderecos){
            $("#selectPartida").append("<option value='"+enderecos[a]+"'> "+enderecos[a]+" </option> ");
            $("#selectDestino").append("<option value='"+enderecos[a]+"'> "+enderecos[a]+" </option> ");
        }
       //==========================================
       // Reseta Campos ===========================
        $("#btnPopUpInstrucoes").hide();
        $("#right-panel").html("");


       //==========================================

        myApp.preloader.hide();
        adicionaTela(mainView, "page3");
     }

    function calculateAndDisplayRoute() {

        var start = document.getElementById('selectPartida').value;
        var end = document.getElementById('selectDestino').value;
        var travel = document.getElementById('selectTransporte').value;
        var aux = $("#selectPartida").val();

       // Se for minha localizacao atual ele manda as coordenadas ===
        if(start == 1){
            start = latitudeAtual+", "+longitudeAtual;
        } 
       //============================================================

        if(start == end){
            notificacao("Um endereço não pode ser usado como partida e destino", 3000);
        }else{

            directionsService.route({
                origin: start,
                destination: end,
                travelMode: travel
            }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);

                   // Fecha Accordion ======
                    myApp.accordion.close("#accordionFiltroRota");
                   //=======================
                   // Exibi btn para instrucoes
                    $("#btnPopUpInstrucoes").show();
                   //=======================
                   // Monta historico de rota 
                    var u = new Object();
                    u.origem = aux == 1 ? response.routes[0].legs[0].start_address : start;
                    u.destino = end;
                    u.transporte = travel;
                    u.data = getHoje();
                    historico.push(u);
                    salvarHistorico();
                   //=======================


                } else {
                    notificacao("Falha ao gerar rota, tente novamente", 2500);
                    $("#btnPopUpInstrucoes").hide();
                }
            });
        }
     }

//===================================================================================================
// HISTORICO ========================================================================================
    function paginacaoHistoricoRotas(){

        myApp.preloader.show();

       // Faz a paginação -----------------------------------------------------------------------------
   
        var pagConsultaHistorico = $('#paginationConsultaHistorico');
        $('#paginationConsultaHistorico').pagination({
            dataSource: historico,
            pageSize: 10,
            showPageNumbers: false,
            showNavigator: true,
            showGoInput: false,
            showGoButton: false,
            afterPaging: function(){ scrollParaCimaEfeito("page4"); },
            callback: function(data, pagination) {

                $("#listaHistoricoCompleta").html("");
                arrayHistoricosNaTela = new Array();

                for(var i in data){

                   // Define a cor de fundo de cada linha ---------------------------------------------------------
                    var corFundo = "white";
                    if(i % 2 == 0){
                        corFundo = "rgba(93, 188, 210, 0.15)";
                    }else{ corFundo = ""}
                   //----------------------------------------------------------------------------------------------
                   // Funções internas sobre a consulta de pedidos ------------------------------------------------
                    abrePopOverHistorico = function(indice){

                        indiceHistoricoClicado = indice;
                        $("#btnPageNovaRotaHistorico").attr("onclick", "pegaLocAtual('historico')");
                        myApp.popover.open("#popOverNovaRotaHistorico", "#historicoConsulta"+indice, true);
                    }
                   //----------------------------------------------------------------------------------------------
                   // Carrega HTML --------------------------------------------------------------------------------

                    $("#listaHistoricoCompleta").prepend(" "
                        +"  <div id='historicoConsulta"+i+"' class='row' onclick='abrePopOverHistorico("+i+")' style='font-size: 14px; margin: 10px; padding: 10px; font-weight: bold; background-color: "+corFundo+"'> "
                        +"      <div class='col-40 procura' > "+data[i].origem+" </div > "
                        +"      <div class='col-40' > "+data[i].destino+" </div > "
                        +"      <div class='col-20' style='text-align: right;'> "
                        +           data[i].data +" " 
                        // +"          <span style='color: rgba(128, 128, 128, 0.23921568627450981); padding-left:  10px;'> <i class='fa fa-chevron-right' style='color: "+corSeta+";'></i>  </span> "
                        +"      </div> "
                        +"  </div> "
                    );

                    arrayHistoricosNaTela.push(data[i]);
                   //----------------------------------------------------------------------------------------------
                }
            }
        });

        $("#qtdTotalViagens").html(historico.length + " ");
        myApp.preloader.hide();
        adicionaTela(mainView, "page4");

       //----------------------------------------------------------------------------------------------
     }

    function calculaRotaHistorico(){

        myApp.preloader.show();

        directionsDisplay = new google.maps.DirectionsRenderer;
        directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('mapRota'), {
          zoom: 7,
          center: {lat: latitudeAtual, lng: longitudeAtual}
        });

        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('right-panel'));

       // Reseta Campos ===========================
        $("#btnPopUpInstrucoes").hide();
        $("#right-panel").html("");


       //==========================================

        var start = arrayHistoricosNaTela[indiceHistoricoClicado].origem;
        var end = arrayHistoricosNaTela[indiceHistoricoClicado].destino;
        var travel = arrayHistoricosNaTela[indiceHistoricoClicado].transporte;

        directionsService.route({
            origin: start,
            destination: end,
            travelMode: travel
        }, function(response, status) {

            if (status === 'OK') {
                directionsDisplay.setDirections(response);

            // Fecha Accordion ======
                myApp.accordion.close("#accordionFiltroRota");
            //=======================
            // Exibi btn para instrucoes
                $("#btnPopUpInstrucoes").show();
            //=======================
            // Monta historico de rota 
                var u = new Object();
                u.origem = start;
                u.destino = end;
                u.transporte = travel;
                u.data = getHoje();
                historico.push(u);
                salvarHistorico();
            //=======================

            } else {
                notificacao("Falha ao gerar rota, tente novamente", 2500);
                $("#btnPopUpInstrucoes").hide();
            }
        });

        myApp.popover.close("#popOverNovaRotaHistorico");
        myApp.preloader.hide();
        adicionaTela(mainView, "page3");
     }

//===================================================================================================
function iniciaViews(){ // Inicia todas as views do framework

    mainView = myApp.views.create('.view-inicial', {
        url: '/',
        stackPages: true,
        routes: [
            { path: '/page1/', pageName: 'page1' },
            { path: '/page2/', pageName: 'page2' },
            { path: '/page3/', pageName: 'page3' },
            { path: '/page4/', pageName: 'page4' },
        ],
    });
 }
 