seatingchart.factory('peopleFactory', function($firebase, $rootScope){
	var peopleRef = new Firebase("https://seatingchart.firebaseio.com/people");
	var people = $firebase(peopleRef);
	
	return{
		getAllPeople: function(){
			return people;
		}, 
		addOrUpdatePerson: function(key,newPerson){
			people.$child(key).$set(newPerson);
		},
		removePerson: function(key){
			people.$remove(key);
		},
		setPersonToEdit: function(key){
			$rootScope.$broadcast('UPDATE_EDIT_PERSON', people.$child(key));
		}
	}

})