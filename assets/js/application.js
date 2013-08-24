window.onload = function() {
	$(window).resize(function(){
		$('.content').height($(window).height() - 54);
	}).resize(); 
}