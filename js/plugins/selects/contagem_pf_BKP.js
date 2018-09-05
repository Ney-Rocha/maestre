var formOk = 0;
var errorMsg = '';

$(document).ready(function(){

    prepareScreen();

});



function contar() {

    switch($('.painel-visualizacao').attr("id")) {
            case 'radar':
                contarRadar();
                break;
            case 'polar':

                break;
            case 'donut':

                break;
            case 'tabela':
                contarTabela();
                break;
            case 'linha':

                break;
            case 'barra':

                break;
        };

}

function contarTabela() {



            swal({
                title: "Aguarde",
                text: "<img src='img/loader.gif' class='loader-gif'><br>Contando registros na base",
                allowOutsideClick : false,
                showCancelButton : false,
                showConfirmButton:false,
                html: true
            });
  


    var idadeDe     = $('#idade-de').val();
    var idadeAte    = $('#idade-ate').val();
    var chkMasc     = $('#masculino').is(':checked');
    var chkFem      = $('#feminino').is(':checked');
    var chkInd      = $('#indefinido').is(':checked');
    var selEstCiv   = $('#est-civil').val();
    var selEscol    = $('#escolaridade').val();
    var selCbo      = $('#cbo').val();
    var selUf       = $('#uf').val();
    var selCidades  = $('#cidades').val();
    var tableOrder  = $('#column-order').val().substring(0, $('#column-order').val().length - 1).split(',');

    // Pegando faixa de idade se tiver
    if (((idadeDe.length == 0) && (idadeAte.length != 0)) || ((idadeDe.length != 0) && (idadeAte.length == 0))) {
        errorMsg = 'Verificar o campo de idade \n';
    }


    
    
    //console.log(tableOrder);


    var data = {
        "idadeDe"   : idadeDe,
        "idadeAte"  : idadeAte,
        "chkMasc"   : chkMasc,
        "chkFem"    : chkFem,
        "chkInd"    : chkInd,
        "selEstCiv" : selEstCiv,
        "selEscol"  : selEscol,
        "selCbo"    : selCbo,
        "selUf"     : selUf,
        "selCidades"  : selCidades,
        "tableOrder"  : tableOrder
    };
      

    $.ajax('api/contagem/pf/tabela', {
        method: "POST",
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        dataType: "json",
        success: function (data) {
            //console.log(data);
            fillDataTable(data);
            swal.close();
        },
        error: function (err) {
            console.log(err);
            swal.close();
        }
    });


}

function prepareScreen() {

    $('#contar').click( function() {
        contar();
    });

    // checkbox tipo grafico
    $('.painel-visualizacao').click( function() {
        $('.painel-visualizacao').removeClass('panel-primary');
        $(this).addClass('panel-primary');

        switch($(this).attr("id")) {
            case 'radar':
                $('#tabela-resultado').hide();
                $('#tabela-ordenacao').hide();
                break;
            case 'polar':
                $('#tabela-resultado').hide();
                $('#tabela-ordenacao').hide();
                break;
            case 'donut':
                $('#tabela-resultado').hide();
                $('#tabela-ordenacao').hide();
                break;
            case 'tabela':
                $('#tabela-resultado').show();
                $('#tabela-ordenacao').show();
                break;
            case 'linha':
                $('#tabela-resultado').hide();
                $('#tabela-ordenacao').hide();
                break;
            case 'barra':
                $('#tabela-resultado').hide();
                $('#tabela-ordenacao').hide();
                break;
        };

    });


    $.getJSON( "json/cbo.json", function( data ) {
                    
        $.each(data, function(key, cbo) {

            $("#cbo").append('<option value="'+cbo+'">'+cbo+'</option>');

        });

        $("#cbo").trigger("chosen:updated");
       
    });


    $("#uf").chosen().change(function (event) {
        
        var ufs = $(event.target).val();

        if (ufs != null) {

            $('#cidades').find('option').remove();

            $.each(ufs, function(key, uf) {

                $.getJSON( "json/"+uf+".json", function( data ) {
                    
                    $.each(data, function(key, cidade) {

                        $("#cidades").append('<option value="'+uf+'|'+cidade+'">'+uf+'|'+cidade+'</option>');

                    });

                    $("#cidades").trigger("chosen:updated");
                   
                });

            });

        } else {
            $('#cidades').find('option').remove();
            $("#cidades").trigger("chosen:updated");
        }


    });

    $(".valida-num").keypress(function (e) {
         if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //$("#errmsg").html("Somente números").show().fadeOut("slow");
            return false;
        }
    });

    // idade
    $("#idade-ate").blur(function (e) {
        if ($("#idade-ate").val() < $("#idade-de").val()) {
            $("#errmsg").html("Idade inicial não pode ser menor que final").show().fadeOut(5000);
            return false;
        }
    });

    // checkbox sexo
    var elem = document.querySelector('.js-switch');
    var switchery = new Switchery(elem, { color: '#1AB394' });
    var elem_2 = document.querySelector('.js-switch_2');
    var switchery_2 = new Switchery(elem_2, { color: '#1AB394' });
    var elem_3 = document.querySelector('.js-switch_3');
    var switchery_3 = new Switchery(elem_3, { color: '#1AB394' });

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });

    configDraggableTable();


}




var config = {
    '.chosen-select'           : {},
    '.chosen-select-deselect'  : {allow_single_deselect:true},
    '.chosen-select-no-single' : {disable_search_threshold:10},
    '.chosen-select-no-results': {no_results_text:'nada foi encontrado!'},
    '.chosen-select-width'     : {width:"95%"}
}



for (var selector in config) {
    $(selector).chosen(config[selector]);
}



function configDraggableTable() {

    // Reset the game
    correctCards = 0;
    $('#cardPile').html( '' );
    $('#cardSlots').html( '' );

    // Create the pile of shuffled cards
    var vars = [ 'Quant', 'UF', 'Cidade', 'Bairro', 'Idade', 'Sexo', 'EstCivil', 'Escol', 'CBO'];
    //numbers.sort( function() { return Math.random() - .5 } );

    for ( var i=0; i<vars.length; i++ ) {
        $('<div>' + vars[i] + '</div>').data( 'tag', vars[i] ).attr( 'id', 'card'+vars[i] ).appendTo( '#cardPile' ).draggable( {
          containment: '#content',
          stack: '#cardPile div',
          cursor: 'move',
          revert: true
        } );
    }

    // Create the card slots
    var words = [ '?', '?', '?', '?', '?', '?', '?', '?', '?'];
    for ( var i=1; i<=words.length; i++ ) {
        $('<div>' + words[i-1] + '</div>').data( 'tag', i ).appendTo( '#cardSlots' ).droppable( {
          accept: '#cardPile div',
          hoverClass: 'hovered',
          drop: handleCardDrop
        } );
    }

}



function handleCardDrop( event, ui ) {
    
    var slotNumber = $(this).data( 'tag' );
    var cardNumber = ui.draggable.data( 'tag' );

    // console.log(slotNumber);
    // console.log(cardNumber);

    $('#column-order').val($('#column-order').val() + cardNumber + ',');

    ui.draggable.addClass( 'selecionado' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
  
    //console.log (  $('#cardSlots').html()   );

    $('#resultado-tabela').find('tr').each(function(){ 
        $(this).find('th').eq(-1).after('<th>'+cardNumber+'</th>'); 
        $(this).find('td').eq(-1).after('<td></td>'); 
    });

}


function prepareDataTable() {

    $('.dataTables-example').DataTable({
        //ajax: 'js/pages/contagem_pf_data.json',
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            { extend: 'copy'},
            {extend: 'csv', title: 'DXON_Contagem_PF_CSV'},
            {extend: 'excel', title: 'DXON_Contagem_PF_Excel'},
            {extend: 'pdf', title: 'DXON_Contagem_PF_PDF'},
            {extend: 'print',
            customize: function (win){
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');
                $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
            }
        }]
    });

}

function fillDataTable(rows) {

    var th = '';
    var td = '';
    var columnOrder = $('#column-order').val().substring(0, $('#column-order').val().length - 1).split(',');

    $.each(columnOrder, function( index, col ) {
        th += '<th>' + col + '</th>';
    });

    $.each(rows, function( index, row ) {

        td += '<tr>';

        $.each(columnOrder, function(i, column) {

            $.each(row, function(k, v) {

                if (column == k) {
                    td += '<td>' + v + '</td>';
                }

            });  

        });

        td += '</tr>';

    });


    var table = '<table id="resultado-tabela" class="table table-striped table-bordered table-hover dataTables-example"><thead><tr>'
    table += th + '</tr></thead>';
    table += td;
    
    $('#div-resultado-tabela').empty();
    $('#div-resultado-tabela').append(table);

    prepareDataTable();

}