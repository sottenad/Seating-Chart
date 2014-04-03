seatingchart.controller('peopleCtrl', function($scope, $firebase, peopleFactory){

	$scope.peopleTypes = ["Developer", "Designer", "Program Manager", "Architect", "QA", "Operations", "Marketing", "Sales"];
	
	
	var peopleRef = new Firebase("https://seatingchart.firebaseio.com/people");
	$scope.people = $firebase(peopleRef);
	$scope.addPerson = function(){
		var np = {
			'firstName': $scope.person.firstName,
			'lastName': $scope.person.lastName,
			'type': $scope.person.type,
			'isRemote':$scope.person.isRemote,
			'isAssigned':$scope.person.isAssigned
		};
		var fullname = $scope.person.firstName.toLowerCase()+$scope.person.lastName.toLowerCase();
		peopleFactory.addPerson(fullname, np);
		$scope.person = null;
	}
	
	$scope.removePerson = function(key){
		peopleFactory.removePerson(key);
	}
	
	$scope.updatePerson = function(key){
		var np = {
			'firstName': $scope.person.firstName,
			'lastName': $scope.person.lastName,
			'type': $scope.person.type,
			'isRemote':$scope.person.isRemote,
			'isAssigned':$scope.person.isAssigned
		};
		var fullname = $scope.person.firstName.toLowerCase()+$scope.person.lastName.toLowerCase();
		peopleFactory.addOrUpdatePerson(fullname, np);
		$scope.project = null;
	}
	$scope.setPersonToEdit = function(key){
		peopleFactory.setPersonToEdit(key);
		$('#personModal').modal();
	}
	
	$scope.$on('UPDATE_EDIT_PERSON', function ( event, newPersonFirebase ) {
		$scope.person = newPersonFirebase;
	 });
	
});



function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

