function NewsController($scope) {
  $scope.news = [
  	{
  		title: 'Hacker News ',
  		url: "http://api.ihackernews.com/page", 
  		type: 'hackerNews'
  	}, 
  	{
  		title: 'Reddit ',
  		url: "http://www.reddit.com/r/programming/.json", 
  		type: 'reddit',
  		subreddit: [
  			{ 
  				title: 'Programming ',
					url: '/r/programming/.json'
				},
				{
					title: 'Pics ', 
					url: '/r/pics/.json'
				} 
			]
  	}, 
  	{
  		title: 'RSS ',
  		url: "http://api.ihackernews.com/page", 
  		type: 'rss'
  	}, 
  	{
  		title: "Scraped Websites ", 
  		url: "",
  		type: "scrape", 
  	}
  ]
  
  $scope.source = $scope.news[0];

	$scope.getNews = function(new_url) {
		var url = new_url || $scope.source.url
		$scope.articles = [];
		$.get('/news', { url: url, type: $scope.source.type })
		  .done(function(data) {
			 	$scope.articles = JSON.parse(data);
			 	if (!$scope.$$phase) {
	        $scope.$apply();
	        $type = $scope.source.type;
	    	}  
			});
	};

	$scope.loadSubreddit = function(subreddit) {
		$scope.getNews("http://www.reddit.com" + subreddit.url);
		$scope.source.default_subreddit = subreddit;
	}	

	$scope.showInPreview = function(article) { 
		// $.get('/scrape', { url: article.Url})
		//   .done(function(data) {
		//   	$('.preview').append(data)
		// 	});
		window.frames.preview.location.replace(article.Url);
		//console.log(window.frames.preview);
	};	

	$scope.setSource = function(new_source) {
		if($scope.source.type !== new_source) {
			switch(new_source) {
				case "hackerNews": 
					$scope.source = $scope.news[0];
					break;
				case  "reddit":
					$scope.source = $scope.news[1];
					$scope.source.default_subreddit = $scope.news[1].subreddit[0];
					break;
				case "rss":
					$scope.source = $scope.news[2];
					break;
				case "scrape":
					$scope.source = $scope.news[3]
			}
			$scope.refresh() 
		} // if source needs to change
	}

	$scope.addSubreddit = function() {
		var subreddit = {};		
		subreddit.title = $scope.input_subreddit;
		subreddit.url = "/r/" + $scope.input_subreddit + "/.json";
		$scope.input_subreddit = '';
		$scope.source.subreddit.push(subreddit);
	}

	$scope.removeSubreddit = function(remove_reddit) {
		index = $scope.source.subreddit.indexOf(remove_reddit);
		$scope.source.subreddit.splice(index, 1);
	}

	$scope.refresh = function() {
		$scope.getNews();
	}

	//TODO: load default list of articles
}
