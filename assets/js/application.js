window.onload = function() {
	$(window).resize(function(){
		$('.content').height($(window).height() - $('.menu-bar').height() - parseInt($('.menu-bar').css('padding-top'))* 2);
	}).resize(); 

	$('.news-list').resize(function(){
		$('.preview').width($(window).width() - $('.news-list').width());
	}).resize();

	$('.subreddits').hover(function(){
		$('.remove-subreddit').show();
		console.log('hover');
	}, function() {
		$('.remove-subreddit').hide();
		console.log('unhover');
	})
}