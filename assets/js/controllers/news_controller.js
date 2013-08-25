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
  	}
  ]
  
  $scope.source = $scope.news[0];

	$scope.getNews = function(new_url) {
		var url = new_url || $scope.source.url
		console.log(url);
		$.get('/news', { url: url, type: $scope.source.type })
		  .done(function(data) {
			 	$scope.articles = JSON.parse(data);
			 	if (!$scope.$$phase) {
	        $scope.$apply();
	      }  
		  });
	};

	$scope.loadSubreddit = function(url) {
		$scope.getNews("http://www.reddit.com" + url);
	}	

	$scope.showInPreview = function(article) { 
		window.frames.preview.location.replace(article.Url);
	};	

	$scope.setSource = function(new_source) {
		if($scope.source.type !== new_source) {
			switch(new_source) {
				case  "reddit":
					$scope.source = $scope.news[1];
					$scope.source.default_subreddit = $scope.news[1].subreddit[0] 
					break;
				case "hackerNews": 
					$scope.source = $scope.news[0];
					break;
				case "rss":
					$scope.source = $scope.news[2];
					break;
			}
			console.log($scope.source, $scope.news[1])
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
		console.log($scope.source);
	}

	$scope.refresh = function() {
		$scope.getNews();
	}

	//TODO: load default list of articles
}
