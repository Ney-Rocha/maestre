/*Criado por Ney Rocha
 em 11/09/2018*/


$('nav a, #rodape>a').click(function(e){
	e.preventDefault();
	var id = $(this).attr('href'),
		targetOffset = $(id).offset().top;
		menuHeight = $('nav').innerHeight();
	$('html, body').animate({
		scrollTop: targetOffset 
	}, 500);
});

$(function(){
	$('html, body').on('click', function(e){
		if(e.target == document.documentelement){
			console.log("Clicado", e.target);
		}
	})
})