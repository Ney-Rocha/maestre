var formOk = 0;
var errorMsg = '';

$(document).ready(function(){


    prepareScreen();

});



function contarTabela() {

    $('#tabela-resultado').show();
    $('#tabela-ordenacao').hide();
    $('#filtros-regiao').hide();
    $('#filtros-pf').hide();

    swal({
        title               : "Aguarde",
        text                : "<img src='img/loader.gif' class='loader-gif'><br>Contando registros na base",
        allowOutsideClick   : false,
        showCancelButton    : false,
        showConfirmButton   : false,
        allowEscapeKey      : false,
        html: true
    });





    setTimeout(function(){
        swal.close();
    }, 7000);


    var map;

      map = new GMaps({
        div: '#map',
        lat: -23.563699 ,
        lng: -46.681220599999996
      });



 GMaps.geolocate({
        success: function(position) {
          map.setCenter(position.coords.latitude, position.coords.longitude);
        },
        error: function(error) {
          //alert('Geolocation failed: '+error.message);
        },
        not_supported: function() {
          alert("Your browser does not support geolocation");
        },
        always: function() {
          //alert("Done!");

          map.addMarker({
            lat: -23.555914000000001,
            lng:  -46.695062,
            title: 'Lima',
            infoWindow: {
              content: 'R MANUEL HENRIQUE LOPES 55 AP 12 <br> PINHEIROS <br> SAO PAULO SP <br> 05414000'
            }
          });
          map.addMarker({
            lat: -23.563641000000001,
            lng:  -46.680858999999998,
            title: 'Marker with InfoWindow',
            infoWindow: {
              content: 'R CON EUGENIO LEITE 613 AP 142 <br> PINHEIROS <br> SAO PAULO SP <br> 05414000'
            }
          });


map.addMarker({
    lat: -23.564405000000001,
    lng: -46.688769000000001,
    title: 'pf 1',
    infoWindow: {
      content: 'R TEODORO SAMPAIO 2177 <br> PINHEIROS <br> SAO PAULO SP <br> 05414000'
    }
});

map.addMarker({
    lat: -23.566479999999999,
    lng: -46.692301,
    title: 'pf 2',
    infoWindow: {
      content: 'R TEODORO SAMPAIO 2763 AP 42 AND 4  <br> PINHEIROS <br> SAO PAULO SP <br> 05414000'
    }
});
map.addMarker({
    lat: -23.566271,
    lng: -46.691352999999999,
    title: 'pf 3',
    infoWindow: {
      content: 'PC SEBASTIAO GIL 10 <br> PINHEIROS <br> SAO PAULO SP <br> 05414000'
    }
});
map.addMarker({
    lat: -23.569682,
    lng: -46.695177000000001,
    title: 'pf 4',
    infoWindow: {
      content: 'R CARD ARCOVERDE 2961  <br> PINHEIROS <br> SAO PAULO SP <br> 05414000'
    }
});
map.addMarker({
    lat: -23.559657000000001 ,
    lng: -46.675261999999996,
    title: 'pf 5',
    infoWindow: {
      content: 'R ALVES GUIMARAES 276 <br> PINHEIROS <br> SAO PAULO SP <br> 05414000'
    }
});
map.addMarker({
    lat: -23.560459000000002,
    lng: -46.681871000000001,
    title: 'pf 6',
    infoWindow: {
      content: 'R FRANCISCO LEITAO 479  <br> PINHEIROS <br> SAO PAULO SP <br> 05414000'
    }
});


        }
      });



}

function prepareScreen() {

    $('#tabela-resultado').hide();

    $('#contar').click( function() {
        contarTabela();
    });

    $('#nova-contagem').click( function() {
        window.location.href = "mapa_pf.html";
    });


    $.getJSON( "json/cbo.json", function( data ) {


        $.each(data, function(key, cbo) {

            // $("#cbo").append('<option value="'+cbo.id+'">'+cbo.desc+'</option>');
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









