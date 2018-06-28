var db = getLocalStorage();
var enderecos;
var historico;

$(document).ready(function(){
    lerDados();
});

function lerDados() {

    enderecos = JSON.parse(db.getItem("enderecos"));    
    historico = JSON.parse(db.getItem("historico"));  
  
    if (enderecos === null) {
        enderecos = new Array(); 
    }
    if (historico === null) {
        historico = new Array(); 
    }
    
 }

function salvarEnderecos() {
    db.setItem("enderecos",JSON.stringify(enderecos));
 }

function salvarHistorico() {
    db.setItem("historico",JSON.stringify(historico));
 }

function getLocalStorage() { // Seleciona localStorage para armazenamento
    try {
        if(window.localStorage) return window.localStorage;            
    }
    catch (e)
    {
        return undefined;
    }
 }