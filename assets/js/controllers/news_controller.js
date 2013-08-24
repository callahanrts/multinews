function NewsController($scope) {
	$scope.news = []
  
	$scope.getHackerNews = function() {
		$.get('/news', { url: "http://api.ihackernews.com/page", type: 'hackerNews' })
		  .done(function(data) {
			 	$scope.news = JSON.parse(data);
			 	if (!$scope.$$phase) {
	        $scope.$apply();
	      }  
		  });
	}

	$scope.showInPreview = function() { 
		
	}
}
