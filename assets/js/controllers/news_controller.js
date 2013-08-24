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
					url: '/r/programming'
				},
				{
					title: 'Pics ', 
					url: '/r/pics'
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

	$scope.getNews = function() {
		$.get('/news', { url: $scope.source.url, type: $scope.source.type })
		  .done(function(data) {
			 	$scope.articles = JSON.parse(data);
			 	if (!$scope.$$phase) {
	        $scope.$apply();
	      }  
		  });
	};

	$scope.showInPreview = function(url) { 
		window.frames.preview.location.replace(url);
		console.log('show in preview');
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
		subreddit.url = "/r/" + $scope.input_subreddit;
		$scope.input_subreddit = '';
		$scope.source.subreddit.push(subreddit);
	}

	$scope.removeSubreddit = function(subreddit) {
		console.log(subreddit)
	}

	$scope.refresh = function() {
		$scope.getNews();
	}

	//TODO: uncomment this when done with development
	//$scope.getHackerNews();
}
