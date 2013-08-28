window.onload = function() {
	$(window).resize(function(){
		$('.content').height($(window).height() - $('.menu-bar').height() - parseInt($('.menu-bar').css('padding-top'))* 2 - parseInt($('.news-list').css('padding-top')));
	}).resize(); 

	$('.news-list').resize(function(){
		$('.preview').width($(window).width() - $('.news-list').width());
	}).resize();

	$('.add-subreddit').css('padding-left', 0);
}