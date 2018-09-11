



$('nav a, #rodape>a').click(function(e){
	e.preventDefault();
	var id = $(this).attr('href'),
		targetOffset = $(id).offset().top;
		menuHeight = $('nav').innerHeight();
	$('html, body').animate({
		scrollTop: targetOffset 
	}, 500);
});