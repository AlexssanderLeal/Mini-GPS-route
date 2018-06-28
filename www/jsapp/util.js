var tamanhoTelaX = window.screen.availWidth;
var tamanhoTelaY = window.screen.availHeight;

// UTEIS -----------------------------------------------------------------------------------------------------------------------------------
  function getMobileOperatingSystem() { // Verifica qual sistema operacional é usado (Retorna IOS ou Android)
	  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
		// Windows Phone must come first because its UA also contains "Android"
	  if (/windows phone/i.test(userAgent)) {
		  return "Windows Phone";
	  }
  
	  if (/android/i.test(userAgent)) {
		  return "ANDROID";
	  }
  
	  // iOS detection from: http://stackoverflow.com/a/9039885/177710
	  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		  return "IOS";
	  }
  
    return "unknown";
    
   }

  function notificacaoFaltaInternet(){ // Sobe Notificação com falha de conexao, com mensagem

    var mensagem1 = "<span style='font-weight: bold; font-size: 18px;'> Conexão não encontrada ! </span>"; 
    var mensagem2 = "<br><br><span style='font-size: 16px;'> Verifica sua conexão ! </span>";

    Snackbar.show({ 
      showAction: true, 
      pos: 'bottom-center',
      text: mensagem1+mensagem2,
      duration: 2000,
      actionText: 'OK',
      actionTextColor: '#f6d00d'
    });
   }

  function notificacao(msg, tempo){ // Sobe Notificação com falha de conexao, com mensagem
      Snackbar.show({ 
        showAction: true, 
        pos: 'bottom-center',
        text: msg,
        duration: tempo,
        actionText: 'OK',
        actionTextColor: '#5DBCD2',
        customClass: 'notificacaoSnack'
      });
   }

  function scrollParaCimaEfeito(id) { // Leva scroll para baixo (com efeito), espera id do elemento que deseja realizar ação
    var div = document.getElementById(id);
    $('#' + id).animate({
      scrollTop: 0
    }, 300);
   }
   
  function scrollParaBaixoComEfeito (id) { // Leva scroll para baixo (sem efeito), espera id do elemento que deseja realizar ação
      var element = document.getElementById(id);
      $('#' + id).animate({
        scrollTop: element.scrollHeight - element.clientHeight
      }, 500);
   }

  function scrollParaBaixo (id) { // Leva scroll para baixo (sem efeito), espera id do elemento que deseja realizar ação
      var div = document.getElementById(id);
      div.scrollTop = (div.scrollHeight - div.clientHeight);
   }

  function setCharAt(str,index,chr) { // Troca character de determinada posicao da String (String, posicao, char)
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
   }

  function numberToReal(numero) { // Deixa numero dizima com 2 casas decimais 
    if(numero == undefined || numero == ""){
      numero = 0;
    }else{
      numero = parseFloat(numero);
    }
    var numero = numero.toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
   } 

  function removerAcentos( newStringComAcento ) { // Remove qualquer tipo de acento (Espera uma String e retorna a mesma sem acento)
    
      if(newStringComAcento == null || newStringComAcento == undefined){
        return "";
      }else{
        var string = newStringComAcento;
        var mapaAcentosHex 	= {
          a : /[\xE0-\xE6]/g,
          A : /[\xC0-\xC6]/g,
          e : /[\xE8-\xEB]/g,
          E : /[\xC8-\xCB]/g,
          i : /[\xEC-\xEF]/g,
          I : /[\xCC-\xCF]/g,
          o : /[\xF2-\xF6]/g,
          O : /[\xD2-\xD6]/g,
          u : /[\xF9-\xFC]/g,
          U : /[\xD9-\xDC]/g,
          c : /\xE7/g,
          C : /\xC7/g,
          n : /\xF1/g,
          N : /\xD1/g
        };
    
        for ( var letra in mapaAcentosHex ) {
          var expressaoRegular = mapaAcentosHex[letra];
          string = string.replace( expressaoRegular, letra );
        }
    
        return string;
      }
   } 
  function adicionaTela(view, idPage){ // Ativa Tela passada como parametro
    
    view.router.navigate("/"+idPage+"/");

    //   var aux = new Object();
    
    //   aux.view = view;
    //   aux.idPage = idPage;
    
    //  // So adiciona no array se a proxima tela for diferente da ultima
    //   if(telas.length == 0){
    //     telas.push(aux);
    //   }else{
    //     if(idPage != telas[telas.length-1].idPage){
    //       telas.push(aux);
    //     }
    //   }
   }

  function voltaTela(){
    
    // Travas necessárias para funcionamento perfeito ---------------------------------------------------------------
  
      if(telas[telas.length-2] != undefined){
       
      }
  
    // --------------------------------------------------------------------------------------------------------------
  
    if(telas[telas.length-2] != undefined){

      // Vou ter que fazer verificacao para ver qual é a tela anterior para saber qual view usar
      mainView.router.back({pageName: telas[telas.length-2].idPage});
  
     // Se ao voltar a algumas paginas, ele faz ações referentes necessarias as telas em questão
      

     // Se a pagina a voltar for o menu, volta no menu do modulo anterior
      

     // Elimina page atual do 'telas'
      telas.splice(-1, 1);
    }
   } 

  function filtraArray(vetor){ // Remove valores repetidos de array
  
      var novoVetor = [];
      for (var i in vetor) {
        if(novoVetor.indexOf(vetor[i]) == -1) novoVetor.push(vetor[i]); 
      }
      return novoVetor;
   }

  function ordenaVetorProp (vetor, atribute, ascendencia){ // Ordena vetor por atributo passado como parametro

      if(typeof vetor[0].atribute == "String"){
        vetor = vetor.sort((a, b) => a[atribute].localeCompare(b[atribute]));
      }else{
        vetor = vetor.sort(function(a, b){
          return a[atribute]-b[atribute];
        });
      }
      
      if(ascendencia == "desc") vetor.reverse();
      return vetor;
   }

  function gera_cor(){ // Gera uma cor aleatoria
    var hexadecimais = '0123456789ABCDEF';
    var cor = '#';
  
    // Pega um número aleatório no array acima
    for (var i = 0; i < 6; i++ ) {
    //E concatena à variável cor
        cor += hexadecimais[Math.floor(Math.random() * 16)];
    }
    return cor;
   }

// MANIPULACAO DE DATAS --------------------------------------------------------------------------------------------------------------------
  function nomeDiaData(indiceDia) { // Pega indice do dia da semana e passa para escrita comum
    var diaEscrito = "";

    switch(indiceDia){
      case 0:
        diaEscrito = "Domingo";		
      break;

      case 1:
        diaEscrito = "Segunda - Feira";
      break;

      case 2:
        diaEscrito = "Terça - Feira";
      break;

      case 3:
        diaEscrito = "Quarta - Feira";
      break;

      case 4:
        diaEscrito = "Quinta - Feira";
      break;

      case 5:
        diaEscrito = "Sexta - Feira";
      break;

      case 6:
        diaEscrito = "Sábado";
      break;
    }

    return diaEscrito;
   }


  function getHoje() { // Pega data atual com horas e minutos, ja passando para formato BR 
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear().toString().substring(2,4);
    
    var hh = today.getHours();
    var mi = today.getMinutes();
    
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    if (hh<10){
        hh = '0' + hh;
    }
    if (mi<10){
        mi = '0' + mi;
    }
    var today = dd+'/'+mm+'/'+yyyy +' '+hh+':'+mi;

	  return today;
   }


  function getDataHoje() { // Pega data atual, ja passando para formato BR
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    
    
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
   
    var today = dd+'/'+mm+'/'+yyyy;
	  return today;
   }

  function getDataOntem() { // Pega data do dia anterior, ja passando para formato BR 
    var hoje = new Date();
    var ontem = new Date();
    ontem.setDate(hoje.getDate()-1);
    var dd = ontem.getDate();
    var mm = ontem.getMonth()+1; //January is 0!

    var yyyy = ontem.getFullYear();
    
    
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
   
    var today = dd+'/'+mm+'/'+yyyy;
	  return today;
   }

  function getDataHoje2Digitos() { // Pega data atual, ja passando para formato BR
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yy = today.getFullYear().toString();
    yy = yy.substring(2,4);
    
    
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
   
    var today = dd+'/'+mm+'/'+yy;
	  return today;
   }

  function getDataOntem2Digitos() { // Pega data do dia anterior, ja passando para formato BR 
    var hoje = new Date();
    var ontem = new Date();
    ontem.setDate(hoje.getDate()-1);
    var dd = ontem.getDate();
    var mm = ontem.getMonth()+1; //January is 0!

    var yy = ontem.getFullYear().toString();
    yy = yy.substring(2,4);
    
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
   
    var today = dd+'/'+mm+'/'+yy;
	  return today;
   }

  function getAbreviacaoMes(indiceMes) { // Pega indice do mes e o abrevia em 3 letras
	  var abreviacaoMes = "";

    switch(indiceMes){
      case 0:
        abreviacaoMes = "JAN";
      break;
      case 1:
        abreviacaoMes = "FEV";
      break;
      case 2:
        abreviacaoMes = "MAR";
      break;
      case 3:
        abreviacaoMes = "ABR";
      break;
      case 4:
        abreviacaoMes = "MAI";
      break;
      case 5:
        abreviacaoMes = "JUN";
      break;
      case 6:
        abreviacaoMes = "JUL";
      break;
      case 7:
        abreviacaoMes = "AGO";
      break;
      case 8:
        abreviacaoMes = "SET";
      break;
      case 9:
        abreviacaoMes = "OUT";
      break;
      case 10:
        abreviacaoMes = "NOV";
      break;
      case 11:
        abreviacaoMes = "DEZ";
      break;
    }

	  return abreviacaoMes;
   }

  function getNomeMes(indiceMes) { // Pega indice do mes e passa para escrita comum

    var nomeMes = "";

    switch(indiceMes){
      case 0:
        nomeMes = "Janeiro";
      break;
      case 1:
        nomeMes = "Fevereiro";
      break;
      case 2:
        nomeMes = "Março";
      break;
      case 3:
        nomeMes = "Abril";
      break;
      case 4:
        nomeMes = "Maio";
      break;
      case 5:
        nomeMes = "Junho";
      break;
      case 6:
        nomeMes = "Julho";
      break;
      case 7:
        nomeMes = "Agosto";
      break;
      case 8:
        nomeMes = "Setembro";
      break;
      case 9:
        nomeMes = "Outubro";
      break;
      case 10:
        nomeMes = "Novembro";
      break;
      case 11:
        nomeMes = "Dezembro";
      break;
	  }

	  return nomeMes;
   }

  function convertDatePicker(data) { // Pega data do datepicker e retorna da maneira usada no banco de dados

    var dataOK = "";
    var mes = data.substring(3,6);
    var numeroMes = "";
    
    // Troca o nome do mes pelo numero 
    switch(mes){
      case "Jan":
        numeroMes = '01';
      break;
      case "Fev":
        numeroMes = '02';
      break;
      case "Mar":
        numeroMes = '03';
      break;
      case "Abr":
        numeroMes = '04';
      break;
      case "Mai":
        numeroMes = '05';
      break;
      case "Jun":
        numeroMes = '06';
      break;
      case "Jul":
        numeroMes = '07';
      break;
      case "Ago":
        numeroMes = '08';
      break;
      case "Set":
        numeroMes = '09';
      break;
      case "Out":
        numeroMes = '10';
      break;
      case "Nov":
        numeroMes = '11';
      break;
      case "Dez":
        numeroMes = '12';
      break;
    }

    dataOK = data.substring(7,11)+"-"+numeroMes+"-"+data.substring(0,2);
    return dataOK;
   }

  function passaAbrMesBr(mes) { // Pega Data em ingles e passa para BR para envio para servico

    var nomeMes = "";
    
    // Troca o nome do mes pelo numero 
    switch(mes){
      case "Jan":
        nomeMes = 'Jan';
      break;
      case "Feb":
        nomeMes = 'Fev';
      break;
      case "Mar":
        nomeMes = 'Mar';
      break;
      case "Apr":
        nomeMes = 'Abr';
      break;
      case "May":
        nomeMes = 'Mai';
      break;
      case "Jun":
        nomeMes = 'Jun';
      break;
      case "Jul":
        nomeMes = 'Jul';
      break;
      case "Aug":
        nomeMes = 'Ago';
      break;
      case "Sep":
        nomeMes = 'Set';
      break;
      case "Oct":
        nomeMes = 'Out';
      break;
      case "Nov":
        nomeMes = 'Nov';
      break;
      case "Dec":
        nomeMes = 'Dez';
      break;
    }

    return nomeMes;
   }

  function diasPreDefinidos(dias, id){ // Seta data do F7 de acordo com os dias clicados

    var data1 = new Date(); 
    data1 = data1.setDate(data1.getDate() - dias);
    data1 = new Date(data1);
    var data2 = new Date();

   // Pega trecho apenas com data
    data1 = data1.toString().substring(4,15);
    data2 = data2.toString().substring(4,15);

   // Monta a primeira data
    var dia1 = data1.substring(4,6);
    var mes1 = passaAbrMesBr(data1.substring(0,3));
    var ano1 = data1.substring(7,11);

   // Monta a segunda data
    var dia2 = data2.substring(4,6);
    var mes2 = passaAbrMesBr(data2.substring(0,3));
    var ano2 = data2.substring(7,11);

   // Monta data completa para setar
    var dataPronta = dia1+" "+mes1+" "+ano1+" - "+dia2+" "+mes2+" "+ano2;


   // SETA NO CALENDAR ESPECIFICADO
    $("#"+id).val(dataPronta).trigger('change');    
    
   }

  function verificaDiaAbrev(parametro){ // Recebe data como parametro e retorna Ontem, Hoje, ou false de acordo com a data atual

    var diaParametro = parametro.substring(0,2);

    // Verifica se o mes tem 2 digitos ou 1 so
    var mesParametro = "";
    var anoParametro = "";
    if(parametro.length == 10){
      mesParametro = parametro.substring(3,5);
      anoParametro = parametro.substring(6,10);
    }else{
      mesParametro = parametro.substring(3,4);
      anoParametro = parametro.substring(5,9);
    }
    
    var aux = new Date();
    var diaAtual = aux.getDate();
    var mesAtual = aux.getMonth()+1;
    var anoAtual = aux.getFullYear();

    var dataCompletaParametro = diaParametro+"/"+mesParametro+"/"+anoParametro;
    var dataCompletaAtual = diaAtual+"/"+mesAtual+"/"+anoAtual;

    // HOJE
    if(diaAtual == diaParametro && mesAtual == mesParametro && anoAtual == anoParametro){
      return "Hoje";
    }
    // ONTEM
    else if( (diaAtual-diaParametro == 1) && mesAtual == mesParametro && anoAtual == anoParametro){
      return "Ontem";
    }

    else {
      return false;
    }

   }

  function formatIsoToBr(iso){ // Formata data em ISO para localDateBR

    date = new Date(iso);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();
    hh = date.getHours();
    mi = date.getMinutes();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return dt+'/' + month + '/'+year + ' ' + hh + ':' + mi;

   }