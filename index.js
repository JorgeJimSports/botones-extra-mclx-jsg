// ==UserScript==
// @name         Botones mecalux
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  botones extra mecalux
// @author       Jorge Serrano
// @match        https://*/SmartUI/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1.193
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// @unwrap
// @downloadURL  https://raw.githubusercontent.com/JorgeJimSports/botones-extra-mclx-jsg/main/index.js
// @updateURL    https://raw.githubusercontent.com/JorgeJimSports/botones-extra-mclx-jsg/main/index.js
// ==/UserScript==

(function () {
    'use strict';
    // test update
    const moves = [
        { page: "Stock", segundos_espera: 5000, filter: false, history: false },
        { page: 'Ubicaciones', segundos_espera: 5000, filter: false, history: false },
        { page: 'Ubicaciones dedicadas a picking', segundos_espera: 5000, filter: false, history: false },
        { page: 'Contenedores', segundos_espera: 7000, filter: true, history: false },
        { page: 'Cuentas', segundos_espera: 5000, filter: false, history: true },
        { page: 'Paquetes', segundos_espera: 5000, filter: false, history: false },
        { page: 'Ajustes de stock', segundos_espera: 10000, filter: false, history: false },
        { page: 'Artículos', segundos_espera: 85000, filter: false, history: false },
        { page: 'Envíos', segundos_espera: 5000, filter: false, history: false },
        { page: 'Órdenes de entrada', segundos_espera: 10000, filter: true, history: true },
        { page: 'Líneas de órdenes de entrada', segundos_espera: 13000, filter: true, history: true },
        { page: 'Órdenes de salida', segundos_espera: 10000, filter: false, history: false },
        { page: 'Órdenes de salida', segundos_espera: 35000, filter: true, history: true },
        { page: 'Líneas de órdenes de salida', segundos_espera: 70000, filter: true, history: true },
        { page: "Stock", segundos_espera: 105000, filter: true, history: true },
    ];
    let first_result = '';
    let first_result_2 = '';
    let first_result_3 = '';
    let boton_suma = '<button type="button" class="btn btn-primary jorgesuma" style="background-color:#323232;" title="suma"><img src="https://i.imgur.com/SThtrEf.png" style="width: 18px;"></button>';
    let boton_tarea_block = '<button type="button" class="btn btn-primary jorgeqty_tarea_block" style="background-color:#323232;" title="qty_check"><img src="https://flaticons.net/icon.php?slug_category=miscellaneous&slug_icon=run&icon_size=256&icon_color=FFFFFF&icon_flip=h&icon_rotate=0" style="width: 18px;"></button>';
    let boton_qty_check = '<button type="button" class="btn btn-primary jorgeqty_check" style="background-color:#323232;" title="qty_check"><img src="https://www.pngkey.com/png/full/87-872187_lupa-search-icon-white-png.png" style="width: 18px;"></button>';
    let boton_export = '<li><button type="button" class="btn btn-primary jorgeexportar" title="exportar"><img src="https://flaticons.net/icon.php?slug_category=application&slug_icon=data-export" style="width: 24px;"></button></li>';
    let boton_direccion = '<button type="button" class="btn btn-primary jorgedireccion" style="background-color:#323232;" title="direccion"><img src="https://static-00.iconduck.com/assets.00/address-icon-1620x2048-3s4bnjam.png" style="width: 18px;"></button>';

    function ponerBotones() {
        setTimeout(function () {
            setTimeout(function () {
                $('.primary-buttons').append(boton_suma)
                $(".jorgesuma").on("click", function (event) {
                    check();
                });
                $('.primary-buttons').append(boton_qty_check)
                $(".jorgeqty_check").on("click", function (event) {
                    check_same_qty();
                });
                $('.primary-buttons').append(boton_tarea_block)
                $(".jorgeqty_tarea_block").on("click", function (event) {
                    tarea_block();
                });
                if ($('.jorgeexportar').length < 1) {
                    if ($.trim($('.user-submenu').text()) === 'exportar') {
                        setTimeout(function () {
                            $('user-zone').append(boton_export)
                            $(".jorgeexportar").on("click", function (event) {
                                startExport();
                            });
                        }, 500)
                    }
                }
                $('.primary-buttons').append(boton_direccion)
                $(".jorgedireccion").on("click", function (event) {
                    check_direccion();
                });
            }, 500)

            window.addEventListener('popstate', function (event) {
                $('.primary-buttons').append(boton_suma)
                $(".jorgesuma").on("click", function (event) {
                    check();
                });
                $('.primary-buttons').append(boton_qty_check)
                $(".jorgeqty_check").on("click", function (event) {
                    check_same_qty();
                });
            }, 500)
            setInterval(function () {
                if (first_result != $('.columnHeader-OutboundOrderCode').eq(1).text()) {
                    $('.pintadas').remove();
                    $('.k-master-row').css('background-color', '');
                    first_result = $('.columnHeader-OutboundOrderCode').eq(1).text();
                }

                if (first_result_2 != $('.columnHeader-InternalInfo_UpdateDate').eq(1).text()) {
                    $('.columnHeader-InternalInfo_UpdatedBy').find('.None').css('background-color', '');
                    $('.columnHeader-InternalInfo_UpdatedBy').css('background-color', '');
                    first_result_2 = $('.columnHeader-InternalInfo_UpdateDate').eq(1).text();
                }

                if (first_result_3 != $('#receiver\\.deliverycontent\\.consigneeaddress_zipcode\\.zipcode\\.textbox').text()) {
                    remove_direccion_css();
                    first_result_3 = $('#receiver\\.deliverycontent\\.consigneeaddress_zipcode\\.zipcode\\.textbox').text();
                }
            }, 1000)
        }, 500)
    }
    setInterval(function () {
        if ($('.jorgesuma').length < 1) {
            ponerBotones();
        }
    }, 2500)

    function check() {
        var e = $('.columnHeader-QuantityOrdered').text().split('  ');
        if ($('.columnHeader-QuantityOrdered').length > 0) {
            e = $('.columnHeader-QuantityOrdered').text().split('  ');
        }
        if ($('.columnHeader-QttyReceived').length > 0) {
            e = $('.columnHeader-QttyReceived').text().split('  ');
        }
        if ($('.columnHeader-Quantity').length > 0) {
            e = $('.columnHeader-Quantity').text().split('  ');
        }
        var sum = 0;
        for (var i = 0; i < e.length; i++) {
            let cant = parseInt(e[i].replace('.', ''));
            if (!isNaN(cant)) {
                sum = sum + cant;
            }
        }
        Swal.fire(String(sum));
    }

    function check_same_qty() {
        if ($('.header-left > h2').text() === 'Líneas de órdenes de salida') {
            let i = 0;
            let pintadas_bien = 0;
            let pintadas_demas = 0;
            let no_pintadas = 0;
            const qtys_preparada = $('.columnHeader-QuantityPrepared');
            const qtys_expedida = $('.columnHeader-QuantityShipped');
            for (let qty_pedida of $('.columnHeader-QuantityOrdered')) {
                if (i == 0) {
                    i++;
                    continue;
                }
                let prep_plus_exp = parseInt(qtys_expedida.eq(i).text().replace(".", "")) + parseInt(qtys_preparada.eq(i).text().replace(".", ""))
                let qty_pedida_format = parseInt($(qty_pedida).text().replace(".", ""));
                if (prep_plus_exp == qty_pedida_format) {
                    pintadas_bien++;
                    $(qty_pedida).parents('.k-master-row').eq(0).css('background-color', '#d3ffc8');
                } else if (prep_plus_exp > qty_pedida_format) {
                    pintadas_demas++;
                    $(qty_pedida).parents('.k-master-row').eq(0).css('background-color', '#DEC7D4');
                } else {
                    no_pintadas++;
                }
                i++;
            }
            $('.pintadas').remove();
            $('.primary-buttons').append("<div class='pintadas' style='width: 15rem;background-color: #015198;display: inline-block;color: white;padding: 0.5rem;font-weight: bold;font-family: monospace;'>" + (pintadas_demas + pintadas_bien) + " lineas pintadas</div>")
            $('.primary-buttons').append("<div class='pintadas' style='margin-left: 1rem;height: 2rem;width: 2rem;background-color: rgb(211, 255, 200);color:black;display: inline-block;padding: 0.5rem;font-weight: bold;font-family: monospace;'>" + pintadas_bien + "</div>")
            $('.primary-buttons').append("<div class='pintadas' style='margin-left: 1rem;height: 2rem;width: 2rem;background-color: #DEC7D4;color:black;display: inline-block;padding: 0.5rem;font-weight: bold;font-family: monospace;'>" + pintadas_demas + "</div>")
            $('.primary-buttons').append("<div class='pintadas' style='margin-left: 1rem;height: 2rem;width: 2rem;background-color: #fff;color:black;display: inline-block;padding: 0.5rem;font-weight: bold;font-family: monospace;'>" + no_pintadas + "</div>")
            //Swal.fire("Comprobado correctamente");
        }
    }

    function tarea_block() {
        $('.k-master-row').css('background-color', '');
        if ($('.header-left > h2').text() === 'Tareas') {
            console.log('test');
            let fechas = $('.columnHeader-InternalInfo_UpdateDate .None');


            for (let fecha of fechas) {
                let fechaTexto = $(fecha).text();
                var partes = fechaTexto.split(", ");
                var fecha_part = partes[0];
                var hora = partes[1];

                // Dividir la fecha en día, mes y año
                var fechaPartes = fecha_part.split("/");
                var dia = parseInt(fechaPartes[0], 10);
                var mes = parseInt(fechaPartes[1], 10) - 1; // Meses en JavaScript van de 0 a 11
                var año = parseInt(fechaPartes[2], 10);

                // Dividir la hora en horas, minutos y segundos
                var horaPartes = hora.split(":");
                var horas = parseInt(horaPartes[0], 10);
                var minutos = parseInt(horaPartes[1], 10);

                // Crear un objeto Date con la fecha y hora
                var fechaObj = new Date(año, mes, dia, horas, minutos);

                // Obtener la fecha y hora actual
                var fechaActual = new Date();

                // Calcular la diferencia en milisegundos
                var diferencia = fechaActual - fechaObj;

                // Calcular la diferencia en minutos
                var minutosTranscurridos = diferencia / (1000 * 60);
                // Comprobar si han pasado al menos 30 minutos
                if (minutosTranscurridos >= 30) {
                    $(fecha).parents('.k-master-row').eq(0).css('background-color', 'rgb(255 169 179)');
                }
            };
        }
    }

    function startExport() {
        let i = 0;
        let timeout = 0
        setTimeout(() => {
            for (const iterator of moves) {
                /* 15 segundos entre cada ejecución + X segundos dependiendo de lo que tarde cada tarea*/
                timeout = timeout + parseInt(10000 + iterator['segundos_espera']);
                setTimeout(() => {
                    $("td").filter(function () {
                        return $.trim($(this).text()) === iterator['page'];
                    }).eq(0).click();
                    console.info('cambiando pagina...');
                    setTimeout(() => {
                        if (iterator["history"]) {
                            $('.checkbox_history_content input').click();
                            console.info('pulsando historico...');
                        }
                        if (iterator["filter"]) {
                            $('#manageuserfilters').eq(0).click();
                            console.info('abriendo filtros...');
                            setTimeout(() => {
                                $('.filterselect').eq(0).click();
                                console.info('pulsando filtro...');
                            }, 800);
                        }
                        setTimeout(() => {
                            $('[title="CSV"]').click();
                            console.info('pulsando en exportar CSV...');
                        }, 5000);
                    }, 2500);
                }, timeout);
                i++;
            }
        }, 2500);
    }

    function check_direccion() {
        if ($('.header-left > h2').text() === 'Envíos') {
            let values = {
                nombre: 'contact_name',
                email: 'contact_email',
                telefono: 'contact_cellphone',
                movil: 'contact_phone',
                pais: 'address_country',
                provincia: 'address_state',
                ciudad: 'address_city',
                codigopostal: 'address_zipcode',
                direccion: 'address_addressline',
                complemento: 'address_addressline2'
            };
            // Objeto para almacenar los textos
            let textos = {};
            let selectores = {};

            // Iterar sobre las claves de values
            for (let key in values) {
                // Construir el selector jQuery
                let selector = '#receiver\\.deliverycontent\\.consignee' + values[key] + '\\.' + values[key].split('_')[1] + '\\.textbox';

                // Obtener el texto del elemento correspondiente
                let texto = $(selector).text();

                // Almacenar el texto en el objeto de textos
                selectores[key] = selector;
                textos[key] = texto;
            }
            textos['transportista'] = $('#data\\.deliverycontent\\.carriercode\\.carriercode\\.label').text();


            /* Comprobar que los dos campos de telefono/movil están cubiertos */
            if (textos['movil'].length < 1 || !textos['movil']) $(selectores['movil']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 0 0 / 35%)');
            else $(selectores['movil']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)'); 
            if (textos['telefono'].length < 1 || !textos['telefono']) $(selectores['telefono']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 0 0 / 35%)');
            else $(selectores['telefono']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)'); 

            /* Comprobar que el telefono no es de Portugal y tiene mas de 9 caracteres */
            if (textos['pais'] == 'PT') {
                if (textos['movil'].length > 9) $(selectores['movil']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 0 0 / 35%)');
                else $(selectores['movil']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)'); 
                if (textos['telefono'].length > 9) $(selectores['telefono']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 0 0 / 35%)');
                else $(selectores['telefono']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)'); 
            }

            /* Comprobar que el telefono no es de Portugal y tiene mas de 9 caracteres */
            if (tieneCaracteresEspeciales(textos['nombre'])) {
                $(selectores['nombre']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 0 0 / 35%)');
            }

            // Ejemplo de solicitud AJAX desde otro sitio
            if (textos['pais'] == 'PT' || textos['pais'] == 'ES' && textos['transportista'] != 'NO_ENVIAR') {
                $.ajax({
                    type: 'GET',
                    url: 'https://local.jimsports.dev/mecalux/api.php', // Reemplaza esto con la URL de tu servidor
                    data: {
                        cp_away: textos['codigopostal'],
                    },
                    success: function (response) {
                        let isSame = false;
                        // Manipula la respuesta JSON
                        var textoMin = textos['ciudad'].toLowerCase();

                        // Convertir el objeto JSON a un array
                        var arrayDatos = JSON.parse(response);
                        // Filtrar los datos para obtener las ciudades que coinciden con el texto
                        var ciudadesCoincidentes = arrayDatos.filter(function (item) {
                            if (item.ciudad.toLowerCase().includes(textoMin)) {
                                isSame = true;
                            }
                        });
                        if (!isSame) {
                            $(selectores['ciudad']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 153 0 / 35%)');
                            $(selectores['codigopostal']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 153 0 / 35%)');
                        } else {
                            $(selectores['ciudad']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)');
                            $(selectores['codigopostal']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)');
                        }
                        console.log(isSame);
                    },
                    error: function (error) {
                        console.error('Error en la solicitud AJAX:', error);
                    }
                });
            }
        }
    }
    function tieneCaracteresEspeciales(cadena) {
        var expresionRegular = /[^a-zA-Z0-9]/; // Coincide con cualquier caracter que no sea alfanumérico
    
        return expresionRegular.test(cadena);
    }
    

    function remove_direccion_css() {
        let values = {
            nombre: 'contact_name',
            email: 'contact_email',
            movil: 'contact_cellphone',
            telefono: 'contact_phone',
            pais: 'address_country',
            provincia: 'address_state',
            ciudad: 'address_city',
            codigopostal: 'address_zipcode',
            direccion: 'address_addressline',
            complemento: 'address_addressline2'
        };
        // Iterar sobre las claves de values
        for (let key in values) {
            // Construir el selector jQuery
            let selector = '#receiver\\.deliverycontent\\.consignee' + values[key] + '\\.' + values[key].split('_')[1] + '\\.textbox';

            // Eliminar estilos
            $(selector).parents('.viewfieldcontent').parent().removeAttr('style');
        }
    }
})();
