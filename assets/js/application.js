function TestCtrl($scope) {
	$scope.todos = [
	{text:'learn angular', done:true},
	{text:'build an angular app', done:false}];

	$scope.testing = function() {
		console.log("testing")
	};
}