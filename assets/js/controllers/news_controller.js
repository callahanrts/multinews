function NewsController($scope) {
	$scope.news = [];
  $scope.source = 'Hacker News ';

	$scope.getHackerNews = function() {
		$.get('/news', { url: "http://api.ihackernews.com/page", type: 'hackerNews' })
		  .done(function(data) {
			 	$scope.news = JSON.parse(data);
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
		$scope.source = new_source;
	}

	//TODO: uncomment this when done with development
	//$scope.getHackerNews();
}
