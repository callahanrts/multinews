window.onload = function() {
	var window_height = $(window).height() - $('.menu-bar').height() - parseInt($('.menu-bar').css('padding-top'))* 2;
	$(window).resize(function(){
		$('.content').height(window_height);
	}).resize(); 

	$('.news-list').resize(function(){
		$('.preview').width($(window).width() - $('.news-list').width());
	}).resize();
}