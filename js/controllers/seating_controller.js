
seatingchart.controller('seatingCtrl', function($scope, $firebase, $rootScope, peopleFactory){
	
	$scope.people = peopleFactory.getAllPeople();
	$scope.name = "steve";
	
	$scope.rowCapacity = [6,6,6,4,3,3];
	
	
	$scope.findAmount = function(index){
		if(index == 0){
			return $scope.findOffset(index);
		}else{
			return -1 * $scope.rowCapacity[index];
		}
	}	
	
	$scope.findOffset = function(row){
		var num = 0;
		for(var i = 0; i<row+1; i++){
			num += $scope.rowCapacity[i];
		}
		return num;
	}
	
	$scope.random = function(){
		return 0.5 - Math.random();
	};
	
	$scope.randomize = function(){
		$('.randomizer .glyphicon').addClass('spin');
		var i =0;
		var limit = 30;
		var time = 200;
		var interval = setInterval(function(){
			if(i<limit){
				randomFunc()
				i++;
			}
		}, time);
		setTimeout(function(){
			$('.randomizer .glyphicon').removeClass('spin')
			},
		 limit*time);
	}
	randomFunc = function(){
		var keys = $scope.people.$getIndex();
		angular.forEach(keys, function(key){
			$scope.people[key].$priority = Math.random()*10000;
			$scope.people.$save(key); 
		});
	}
});

seatingchart.filter('notassigned', function(){
  return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
		if((typeof(input[objectKey].isAssigned)=='undefined' || input[objectKey].isAssigned == false)
			&& (typeof(input[objectKey].isRemote)=='undefined' || input[objectKey].isRemote == false)){
			array.push(input[objectKey]);
		}
    }
    return array;
  }
});

seatingchart.filter('assigned', function(){
  return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
		if(input[objectKey].isAssigned == true
			|| input[objectKey].isRemote == true){
			array.push(input[objectKey]);
		}
    }
    return array;
  }
});
   
   