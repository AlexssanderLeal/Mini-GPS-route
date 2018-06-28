var myApp = new Framework7({
    animateNavBackIcon: true,
    smartSelectSearchbar: true,
    modalTitle: 'Agely',
    // Habilita Tema do Android
    material: true,
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    domCache: true, // Habilita Navegação Inline
});

