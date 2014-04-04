seatingchart.controller('peopleCtrl', function($scope, $firebase, peopleFactory){

	$scope.peopleTypes = ["Developer", "Designer", "Program Manager", "Architect", "QA", "Operations", "Marketing", "Sales"];
	
	
	$scope.people = peopleFactory.getAllPeople();
	$scope.showAddModal = function(){
		$('#editPersonModal').modal();
	};
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
	
	$scope.updatePerson = function(){
		var np = {
			'firstName': $scope.personToEdit.firstName,
			'lastName': $scope.personToEdit.lastName,
			'type': $scope.personToEdit.type,
			'isRemote':$scope.personToEdit.isRemote,
			'isAssigned':$scope.personToEdit.isAssigned
		};
		peopleFactory.addOrUpdatePerson($scope.editKey, np);
		$scope.project = null;
		
	}
	
	$scope.setPersonToEdit = function(key){
		peopleFactory.setPersonToEdit(key.toLowerCase());
		$('#editPersonModal').modal();
	}
	
	$scope.$on('UPDATE_EDIT_PERSON', function ( event, personFirebase ) {
		$scope.editKey = personFirebase.$id;
		$scope.personToEdit = personFirebase;
	 });
	
});




