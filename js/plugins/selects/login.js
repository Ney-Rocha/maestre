$(document).ready(function(){

    //

    $('#login').click(function(){

    	console.log($('#user').val());

	    var data = {
	        "login"   	: $('#user').val(),
	        "pass"		: $('#pass').val(),
	        "company"  	: $('#company').val()
	    };
	      

	    $.ajax('api/authenticate', {
	        method: "POST",
	        data: data,
	        contentType: 'application/x-www-form-urlencoded',
	        dataType: "json",
	        success: function (data) {
	            console.log(data);
	            var ns = $.initNamespaceStorage('dx_compose');
	            ns.localStorage.set('token',data.token);
	            ns.localStorage.set('login',data.login);
	            ns.localStorage.set('name',data.name);
	            //window.location.href = 'contagem_pf.html'
	        },
	        error: function (err) {
	            console.log(err);
	            $("#errmsg").html(err.error).show().fadeOut(5000);
	        }
	    });

    });



});


