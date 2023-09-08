// ==UserScript==
// @name         Botones mecalux
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  botones extra mecalux
// @author       Jorge Serrano
// @match        https://*/SmartUI/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1.193
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// @unwrap
// ==/UserScript==

(function() {
    'use strict';
    let is_changed_results = false;
    let first_result = '';
    let boton_suma = '<button type="button" class="btn btn-primary jorgesuma" style="background-color:#323232;" title="suma"><img src="https://i.imgur.com/SThtrEf.png" style="width: 18px;"></button>';
    let boton_qty_check = '<button type="button" class="btn btn-primary jorgeqty_check" style="background-color:#323232;" title="qty_check"><img src="https://www.pngkey.com/png/full/87-872187_lupa-search-icon-white-png.png" style="width: 18px;"></button>';

    setTimeout(function() {
        setTimeout(function() {
            $('.primary-buttons').append(boton_suma)
            $( ".jorgesuma" ).on( "click", function(event) {
                check();
            });
            $('.primary-buttons').append(boton_qty_check)
            $( ".jorgeqty_check" ).on( "click", function(event) {
                check_same_qty();
            });
        },500)

        window.addEventListener('popstate', function(event) {
            $('.primary-buttons').append(boton_suma)
            $( ".jorgesuma" ).on( "click", function(event) {
                check();
            });
            $('.primary-buttons').append(boton_qty_check)
            $( ".jorgeqty_check" ).on( "click", function(event) {
                check_same_qty();
            });
            },500)
    },1500)

    function check(){
        var e = $('.columnHeader-QuantityOrdered').text().split('  ');
        if($('.columnHeader-QuantityOrdered').length > 0){
            e = $('.columnHeader-QuantityOrdered').text().split('  ');
        }
        if($('.columnHeader-QttyReceived').length > 0){
            e = $('.columnHeader-QttyReceived').text().split('  ');
        }
        if($('.columnHeader-Quantity').length > 0){
            e = $('.columnHeader-Quantity').text().split('  ');
        }
        var sum = 0;
        for(var i = 0;i<e.length;i++){
            let cant = parseInt(e[i].replace('.',''));
            if(!isNaN(cant)){
                sum = sum + cant;
            }
        }
        Swal.fire(String(sum));
    }

    function check_same_qty(){
        if($('.header-left > h2').text() === 'Líneas de órdenes de salida'){
            let i=0;
            const qtys_preparada = $('.columnHeader-QuantityPrepared');
            for(let qty_pedida of $('.columnHeader-QuantityOrdered')){
                if(i == 0){
                    i++;
                    continue;
                }
                if(qtys_preparada.eq(i).text() == $(qty_pedida).text()){
                    $(qty_pedida).parents('.k-master-row').eq(0).css('background-color','#d3ffc8');
                }
                i++;
            }
        Swal.fire("Comprobado correctamente");
        }
    }
})();