function NewsController($scope) {
  $scope.news = [
  	{
  		title: 'Hacker News (sometimes works)',
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
  		title: 'RSS (in progress)',
  		url: "", 
  		type: 'rss'
  	}, 
  	{
  		title: "Scraped Websites (in progress)", 
  		url: "",
  		type: "scrape", 
  	}
  ]

	$scope.getNews = function(new_url) {
		var url = new_url || $scope.source.url
		$scope.loaded = false;
		$scope.articles = [];
		$.get('/news', { url: url, type: $scope.source.type })
		  .done(function(data) {
			 	$scope.articles = JSON.parse(data);
			 	$scope.loaded = true;
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

	// NOTE: Sometimes items wont load in iframe. This is a security feature of websites. 
	// Figure out how to display an error or something later maybe
	$scope.showInPreview = function(article) { 
		window.frames.preview.location.replace(article.Url);
	};	

	$scope.setSource = function(new_source) {
		if(!$scope.source || $scope.source.type !== new_source) {
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

	//TODO: later, store preferences in local storage to 
	//      load the users' preferred default news source
	$scope.setSource("reddit");
}
