// ==UserScript==
// @name         Botones mecalux
// @grant        GM_addStyle
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  botones extra mecalux
// @author       Jorge Serrano
// @match        https://*/SmartUI/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=1.193
// @require      https://cdn.jsdelivr.net/npm/sweetalert2@11
// @downloadURL  https://raw.githubusercontent.com/JorgeJimSports/botones-extra-mclx-jsg/main/index.js
// @updateURL    https://raw.githubusercontent.com/JorgeJimSports/botones-extra-mclx-jsg/main/index.js
// ==/UserScript==

(function () {
    'use strict';
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
    let boton_suma = '<button type="button" class="btn btn-primary jorgesuma botones-jsg" style="background-color:#323232;width:29px;height:30px;" title="suma"><img src="https://i.imgur.com/SThtrEf.png" style="width: 18px;"></button>';
    let boton_tarea_block = '<button type="button" class="btn btn-primary jorgeqty_tarea_block botones-jsg" style="background-color:#323232;width:29px;height:30px;" title="qty_check"><img src="https://flaticons.net/icon.php?slug_category=miscellaneous&slug_icon=run&icon_size=256&icon_color=FFFFFF&icon_flip=h&icon_rotate=0" style="width: 18px;"></button>';
    let boton_qty_check = '<button type="button" class="btn btn-primary jorgeqty_check botones-jsg" style="background-color:#323232;width:29px;height:30px;" title="qty_check"><img src="https://www.pngkey.com/png/full/87-872187_lupa-search-icon-white-png.png" style="width: 18px;"></button>';
    let boton_direccion = '<button type="button" class="btn btn-primary jorgedireccion botones-jsg" style="background-color:#323232;width:29px;height:30px;" title="direccion"><img src="https://static-00.iconduck.com/assets.00/address-icon-1620x2048-3s4bnjam.png" style="width: 18px;"></button>';
    let boton_picking = '<button type="button" class="btn btn-primary jorgepicking botones-jsg" style="background-color:#323232;width:29px;height:30px;" title="direccion"><img src="https://cdn-icons-png.flaticon.com/512/660/660376.png" style="width: 18px;filter:invert(1);"></button>';
    let boton_export = ''; //'<li><button type="button" class="btn btn-primary jorgeexportar" title="exportar"><img src="https://flaticons.net/icon.php?slug_category=application&slug_icon=data-export" style="width: 24px;"></button></li>';
    let checks = ['suma', 'lineas', 'tareas', 'direcciones', 'exportar', 'picking'];
    let values_direccion = {
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

    let keysPressed = {};
    let resizable = $('home > app-viewlist').get(0);
    let resizer = $('#rightDiv').get(0);
    let startX;
    let initialLeftWidth;
    let initialRightWidth;
    setInterval(function () {
        resizer = $('#rightDiv').get(0);
        resizable = $('home > app-viewlist').get(0);
        $('#rightDiv').css('cursor','auto');
        if(resizer){
            resizer.addEventListener('mousedown', function(e) {
                $('#rightDiv').css('cursor','ew-resize');
                startX = e.clientX;
                initialLeftWidth = parseFloat(getComputedStyle(resizable).getPropertyValue('--width-left'));
                initialRightWidth = parseFloat(getComputedStyle(resizable).getPropertyValue('--width-right'));

                document.addEventListener('mousemove', resize);
                document.addEventListener('mouseup', stopResize);
            });

            resizer.addEventListener('dblclick', function(e) {
                $('home > app-viewlist').attr('style','--width-left: 70%; --width-right: 30%;');
            });
        }
    }, 1000)

      function resize(e) {
        console.log(getCookie('chck-movesc'));
        if (getCookie('chck-movesc') != 'false') {
            const dx = e.clientX - startX;
            const totalWidth = resizable.offsetWidth;

            let newLeftWidth = initialLeftWidth + (dx / totalWidth) * 100;
            let newRightWidth = initialRightWidth - (dx / totalWidth) * 100;

            // Asegurarse de que las sumas de los porcentajes sean 100% y no negativos
            if (newLeftWidth < 0) newLeftWidth = 0;
            if (newRightWidth < 0) newRightWidth = 0;
            if (newLeftWidth + newRightWidth > 100) {
                const overflow = newLeftWidth + newRightWidth - 100;
                newLeftWidth -= overflow / 2;
                newRightWidth -= overflow / 2;
            }

            resizable.style.setProperty('--width-left', newLeftWidth + '%');
            resizable.style.setProperty('--width-right', newRightWidth + '%');
        }
    }

    function stopResize() {
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }
    /* Intervalo para crear los botones para que aparezcan cada vez que se cambie de pagina */
    setInterval(function () {
        if ($('.botones-jsg').length < 1) {
            ponerBotones();
        }
        if($('home > app-viewlist').attr('style') == "--width-left: 60%; --width-right: 40%;"){
            $('home > app-viewlist').attr('style','--width-left: 70%; --width-right: 30%;');
        }

        /* Convertir los valores del campo "Orden de agrupación" en un link, en "Ordenes de salida" */
        if($('.header-left h2').text() == "Órdenes de salida"){
            let agrupaciones = $('td.columnHeader-OutboundOrderGroupMasterCode');
            if(agrupaciones.length == 1){
                for(let agrupacion of agrupaciones){
                    let orden = $(agrupacion).text().replace(/ /g,'');
                    let valor_ag = $(agrupacion).find('div.None').attr('data-value');
                    if(valor_ag == ''){
                        $(agrupacion).find('div.None').html('');
                    }else if(orden != '' && $(agrupacion).find('.jg-14').text() != valor_ag){
                        $(agrupacion).find('div.None').html('<a class="jg-14" target="_blank" href="https://192.168.1.193/SmartUI/smartui?viewname=EasyWMS%7COutboundOrderVList&viewtype=ViewList&selectedKey=code&selectedValue='+valor_ag+'&History=false&readonly=true&identifier=a3196b2e-282d-9221-a9a5-318099c6760a">'+valor_ag+'</a> <a target="_blank" href="https://192.168.1.193/SmartUI/smartui?viewname=EasyWMS%7COutboundOrderLineVList&viewtype=ViewList&selectedKey=OutboundOrderCode&selectedValue='+valor_ag+'&History=false&modeEdit=false&modeNew=false&autoselected=true&identifier=a49352e7-2c14-f195-f0f1-d6bdfda52fb5"> l </a>');
                    }
                }
            }
        }
    }, 3000)

    /* Intervalo para eliminar estilos una vez se cambia de dato */
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

        if (first_result_3 != $('#data\\.deliverycontent\\.customattributes_attribute5\\.ca5_otuboundordercode\\.textbox').text()) {
            remove_direccion_css();
            first_result_3 = $('#data\\.deliverycontent\\.customattributes_attribute5\\.ca5_otuboundordercode\\.textbox').text();
        }
    }, 1000)

    /**
     * Crear/Mostrar los botones que se han configurado como visibles.
    */
    function ponerBotones() {
        setTimeout(function () {
            /* Controlar pulsación de 'CTRL + Ñ' para abrir modal de opciones de visualización de los botones */
            document.addEventListener('keydown', manejarEvento);
            document.addEventListener('keyup', (event) => {
                delete keysPressed[event.key];
            });
            setTimeout(function () {
                if (getCookie('chck-suma') != 'false') {
                    $('.primary-buttons').append(boton_suma)
                    $(".jorgesuma").on("click", function (event) {
                        checkStock();
                    });
                }
                if (getCookie('chck-lineas') != 'false') {
                    $('.primary-buttons').append(boton_qty_check)
                    $(".jorgeqty_check").on("click", function (event) {
                        check_same_qty();
                    });
                }
                if (getCookie('chck-tareas')!= 'false') {
                    $('.primary-buttons').append(boton_tarea_block)
                    $(".jorgeqty_tarea_block").on("click", function (event) {
                        tarea_block();
                    });
                }
                if (getCookie('chck-direcciones') != 'false') {
                    $('.primary-buttons').append(boton_direccion)
                    $(".jorgedireccion").on("click", function (event) {
                        check_direccion();
                    });
                }
                if (getCookie('chck-picking') != 'false') {
                    $('.primary-buttons').append(boton_picking)
                    $(".jorgepicking").on("click", function (event) {
                        //change_menu();
                    });
                }
                if (getCookie('chck-exportar') != 'false') {
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
                }
            }, 500)
        }, 500)
    }

    /**
    *  Cambia el menú para que esté siempre visible en la parte superior.
    */
    let inter;
    function change_menu(){
        if(!$('.menu-body').attr('jota')){
            $('.menu > a').hide();
            $('.menu-body').css('opacity','1').css('visibility','visible').attr('jota','yes').css('display','flex');
            inter = setInterval(() => {
                $('.menu-body').css('display','flex');
            }, 500);
        } else {
            clearInterval(inter);
            $('.menu > a').show();
            $('.menu-body').attr('style','').removeAttr('jota');
        }
    }

    /**
    *  Muestra en un alert (Sweetalert2) la suma de stock de las lineas mostradas en pantalla.
    */
    function checkStock() {
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
        Swal.fire("Suma del stock visible: <br/>"+String(sum));
    }

    /**
    *  Comprueba las lineas de orden y pinta de verde las que están totalmente preparadas,
    *  en blanco las que no lo están y en rojo las que tienen mas cantidad preparada que pedidas.
    */
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

    /**
    * Comprueba/pinta las tareas que llevan en proceso mas de 30 minutos.
    */
    function tarea_block() {
        $('.k-master-row').css('background-color', '');
        if ($('.header-left > h2').text() === 'Tareas') {
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

    /**
    * Realiza la exportación de datos con los pasos indicados en el array 'moves'.
    */
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

    /**
    * Comprueba la dirección del envío marcado y pinta los valores que están bien de verde y de rojo los que están mal.
    */
    function check_direccion() {
        if ($('.header-left > h2').text() === 'Envíos') {
            // Objeto para almacenar los textos
            let textos = {};
            let selectores = {};

            textos['transportista'] = $('#data\\.deliverycontent\\.carriercode\\.carriercode\\.label').text();
            // Iterar sobre las claves de values
            for (let key in values_direccion) {
                // Construir el selector jQuery
                let selector = '#receiver\\.deliverycontent\\.consignee' + values_direccion[key] + '\\.' + values_direccion[key].split('_')[1] + '\\.textbox';

                // Obtener el texto del elemento correspondiente
                let texto = $(selector).text();

                // Almacenar el texto en el objeto de textos
                selectores[key] = selector;
                textos[key] = texto;
            }

            let movil_error = false;
            let tfno_error = false;
            let errors_text = [];

            $(selectores['movil']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)');
            $(selectores['telefono']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)');
            /* Comprobar que los dos campos de telefono/movil están cubiertos */
            if (textos['movil'].length < 1 || !textos['movil']){
                movil_error = true;
                errors_text['movil_error'] = ' - Está vacio';
            }
            if (textos['telefono'].length < 1 || !textos['telefono']){
                tfno_error = true;
                errors_text['tfno_error'] = ' - Está vacio';
            }

            /* Comprobar que el telefono no es de Portugal y tiene mas de 9 caracteres */
            if (textos['pais'] == 'PT') {
                if (textos['movil'].length > 9){
                    movil_error = true;
                    errors_text['movil_error'] = ' - Para Portugal debe estar formado de 9 caracteres maximo (ejemplo: 612612612)';
                }
                if (textos['telefono'].length > 9){
                    tfno_error = true;
                    errors_text['tfno_error'] = ' - Para Portugal debe estar formado de 9 caracteres maximo (ejemplo: 912612612)';
                }
            }

            if (textos['transportista'].includes('CORREOS')) {
                if (textos['movil'].replace(/\s/g, '').slice(0, 4) == '+349' || textos['movil'].replace(/\s/g, '').slice(0, 1) == '9'){
                    movil_error = true;
                    errors_text['movil_error'] = ' - Debe ser un telefono movil, no puede empezar por 9';
                }
                if (textos['telefono'].replace(/\s/g, '').slice(0, 4) == '+346' || textos['telefono'].replace(/\s/g, '').slice(0, 1) == '6'){
                    tfno_error = true;
                    errors_text['tfno_error'] = ' - Debe ser un telefono fijo, no puede empezar por 6';
                }
            }

            if (movil_error){
                $(selectores['movil']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 0 0 / 35%)');
                $(selectores['movil']).parents('.viewfieldcontent').parent().attr('title', errors_text['movil_error']); 
            } 
            if (tfno_error){
                $(selectores['telefono']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 0 0 / 35%)');
                $(selectores['telefono']).parents('.viewfieldcontent').parent().attr('title', errors_text['tfno_error']); 
            } 

            /* Comprobar que el nombre no tiene '&' */
            if (textos['nombre'].includes('&')) {
                $(selectores['nombre']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 0 0 / 35%)');
                $(selectores['nombre']).parents('.viewfieldcontent').parent().attr('title', 'El nombre no puede incluir el caracter \'&\''); 
            }else if (textos['nombre'].length > 60) {
                $(selectores['nombre']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 153 0 / 35%)');
                $(selectores['nombre']).parents('.viewfieldcontent').parent().attr('title', 'Puede que el nombre sea demasiado largo'); 
            } else{
                $(selectores['nombre']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)');
            }

            /* Comprobar que el pais está formado por 2 letras mayusculas */
            if (!check_pais(textos['pais'])) {
                $(selectores['pais']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 0 0 / 35%)');
                $(selectores['pais']).parents('.viewfieldcontent').parent().attr('title', 'El pais deben ser únicamente 2 letras mayusculas'); 
            } else {
                $(selectores['pais']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)');
            }

            // Ejemplo de solicitud AJAX desde otro sitio
            if ((textos['pais'] == 'PT' || textos['pais'] == 'ES') && !(textos['transportista'].includes('ENVIAR'))) {
                let trans = (textos['transportista'].includes('SEUR')) ? 'seur' : 'cbl';
                let texttop = '';
                if(textos['transportista'].includes('SEUR') || textos['transportista'].includes('CBL')) {
                    texttop = "<strong>No coincide el CP con la ciudad</strong> <br/> Estas son las ciudades aceptables para el codigo postal <b>" + textos['codigopostal'] + "</b>";
                }else {
                    texttop = "<strong>Revise si coincide el CP con la ciudad</strong> <br/> Ciudades aceptables para CBL (Aunque este envio sea otro transporte):";
                }
                $.ajax({
                    type: 'GET',
                    url: 'https://local.jimsports.dev/mecalux/api.php', // Reemplaza esto con la URL de tu servidor
                    data: {
                        cp_away: textos['codigopostal'].replace('-', ''),
                        trans: trans,
                    },
                    success: function (response) {
                        let isSame = false;
                        // Manipula la respuesta JSON
                        var textoMin = textos['ciudad'].toLowerCase();
                        // Convertir el objeto JSON a un array
                        var arrayDatos = JSON.parse(response);
                        // Filtrar los datos para obtener las ciudades que coinciden con el texto
                        arrayDatos.filter(function (item) {
                            if (item.ciudad.toLowerCase() == textoMin) {
                                isSame = true;
                            }
                        });
                        if (!isSame) {
                            $(selectores['ciudad']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 153 0 / 35%)');
                            $(selectores['codigopostal']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(255 153 0 / 35%)');
                            let tablehtml = '<tbody>';
                            for (let dato of arrayDatos) {
                                tablehtml += '<tr>';
                                tablehtml += '<td style="padding-bottom: 1rem;padding-top: 1rem;">' + dato.cp + '</td>';
                                tablehtml += '<td style="padding-bottom: 1rem;padding-top: 1rem;">' + dato.ciudad + '</td>';
                                if (textos['transportista'].includes('CBL')) tablehtml += '<td style="padding-bottom: 1rem;padding-top: 1rem;">' + dato.provincia + '</td>';
                                tablehtml += '</tr>';
                            }
                            tablehtml += '</tbody>';

                            let theadhtml = '<th style="text-align: center;padding-bottom: 0.5rem;padding-top: 0.5rem;">CP</th>';
                            theadhtml += '<th style="text-align: center;padding-bottom: 0.5rem;padding-top: 0.5rem;">Ciudad</th>';
                            if (textos['transportista'].includes('CBL')) theadhtml += '<th style="text-align: center;padding-bottom: 0.5rem;padding-top: 0.5rem;">Provincia</th>';
                            Swal.fire({
                                width: 800,
                                heightAuto: false,
                                title: texttop,
                                icon: "error",
                                html: `
                                <table id="table" border=1 style="width:100%;">
                                    <thead>
                                        <tr>
                                            `+ theadhtml + `
                                        </tr>
                                    </thead>
                                    `+ tablehtml + `
                                </table>
                                `,
                                showCloseButton: true,
                            });
                            $('.swal2-popup').animate({ scrollTop: 0 }, "slow");
                        } else {
                            $(selectores['ciudad']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)');
                            $(selectores['codigopostal']).parents('.viewfieldcontent').parent().css('background-color', 'rgb(16 255 0 / 35%)');
                        }
                    },
                    error: function (error) {
                        console.error('Error en la solicitud AJAX:', error);
                    }
                });
            }
        }
    }

    /**
    * Abre un modal de opciones de visualización de los botones al pulsar 'CTRL + Ñ'.
    */
    async function manejarEvento(event) {
        keysPressed[event.key] = true;
        if (keysPressed['Control'] && event.key == 'ñ') {
            let texthtml = '';
            for (const key of checks) {
                let cookie = (getCookie('chck-' + key) === 'true') ? 'checked' : '';
                texthtml += '<label>Boton ' + key + '</label>';
                texthtml += '<input type="checkbox" class="checkbox" id="chck-' + key + '" style="margin-bottom:2rem;" ' + cookie + '>';
            }
            let cookie = (getCookie('chck-movesc') === 'true') ? 'checked' : '';
            texthtml += '<label>Ajustar lateral</label>';
            texthtml += '<input type="checkbox" class="checkbox" id="chck-movesc" style="margin-bottom:2rem;" ' + cookie + '>';

            const { value: formValues } = await Swal.fire({
                title: "Configuracion de botones",
                html: texthtml,
                focusConfirm: false,
                preConfirm: () => {
                    let data_return = [];
                    for (const key of checks) {
                        data_return.push(document.getElementById("chck-" + key).checked);
                    }
                    data_return.push(document.getElementById("chck-movesc").checked);
                    return data_return;
                }
            });
            if (formValues) {
                let i = 0;
                for (const key of checks) {
                    setCookie('chck-' + key, formValues[i++], 360);
                }
                setCookie('chck-movesc', formValues[i++], 360);
            }
        }
    }

    /**
    * Comprueba que una cadena de texto está formada por 2 letras mayusculas.
    */
    function check_pais(cadena) {
        var expresionRegular = /^[A-Z]{2}$/; // Coincide con exactamente dos letras mayúsculas
        return expresionRegular.test(cadena);
    }

    /**
    * Elimina los estilos añadidos en una direccion de envío.
    */
    function remove_direccion_css() {
        // Iterar sobre las claves de values
        for (let key in values_direccion) {
            // Construir el selector jQuery
            let selector = '#receiver\\.deliverycontent\\.consignee' + values_direccion[key] + '\\.' + values_direccion[key].split('_')[1] + '\\.textbox';
            // Eliminar estilos
            $(selector).parents('.viewfieldcontent').parent().removeAttr('style');
        }
    }

    /**
    * Crea una cookie.
    *
    * @param {string} cname El nombre de la cookie.
    * @param {string} cvalue El valor de la cookie.
    * @param {number} exdays El numero de días que va a estar activa la cookie.
    */
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    /**
    * Devuelve el valor de una cookie.
    *
    * @param {string} cname El nombre de la cookie.
    * @return {string} Valor de la cookie.
    */
    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    setTimeout(() => {
        GM_addStyle ( `
    .swal2-popup {
            overflow-y: auto;
    max-height: 500px;
    }
` );
    }, 1000);
})();
