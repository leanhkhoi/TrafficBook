

function initEventOnTaxi(){
	eventNotifyToTaxiAboutNewPoint();
}
function eventNotifyToTaxiAboutNewPoint(){
	//listen firebase
	var taxiRef = database.ref('Taxis/' + signinTaxi.key);
	taxiRef.on('child_changed', function(data) {
	//setCommentValues(postElement, data.key, data.val().text, data.val().author);
	   // clearOverlays();
	    if(data.key == "cusPhonenumber") {
	     signinTaxi.cusPhonenumber = data.val();

	    }
	    if(data.key == "status"){
	      signinTaxi.status = data.val();

	    }
	    if(data.key == "pointKey"){
	    	signinTaxi.pointKey = data.val();
	    	if(data.val() != 0)
	    	{
	    	 console.log("child_changed" + data.val());
	     	 main.showNotify();
	    	}
	    }
	    if(data.key == "type"){
	      signinTaxi.type = data.val();

	    }
	    
	   // alert(data.val());
	   // console.log(data.val() + "on change");
	    //display position

	});

}

function showPathOnMap(taxiPos, clientPos){
		  		
	directionsDisplay.setMap(map);
	directionsService.route({
	      origin:taxiPos,
	      destination: clientPos,
	      travelMode: 'DRIVING'
	    }, function(response, status) {
	      if (status === 'OK') {
	        directionsDisplay.setDirections(response);
	        var taxiPoint = new google.maps.LatLng(signinTaxi.lat, signinTaxi.lng);
	        createMarker(map,taxiPoint, null, icon);
	        
	      } else {
	        window.alert('Directions request failed due to ' + status);
	      }
	});
	
}
function createMarker(map, point, content,icon) {
    //x++;
    var marker = new google.maps.Marker({
      position: point,
      map: map,
      icon: icon
      //title: String(x)
    });

    markers.push(marker);

   
}

function refeshMap(){
	//deleteAllMarker();
	deleteDirectionService();
}

function deleteAllMarker(){
	for (var i = 0; i < markers.length; i++ ) {
	  markers[i].setMap(null);
	}
	markers=[];
           
}
function deleteDirectionService(){
	if(directionsDisplay!=0)
		directionsDisplay.setMap(null);
}

function considerTaxiToPickNext(map, taxiData, taxiKey, maxCount){
	//console.log(maxCount);
	 var service = new google.maps.DistanceMatrixService;
	 var consideredTaxiPoint = new google.maps.LatLng(taxiData.lat, taxiData.lng);
	 var currentTaxiPoint = new google.maps.LatLng(signinTaxi.lat, signinTaxi.lng);

	    service.getDistanceMatrix({
	         origins: [consideredTaxiPoint],
	         destinations: [currentTaxiPoint],
	         travelMode: 'DRIVING',
	         unitSystem: google.maps.UnitSystem.METRIC,
	         avoidHighways: false,
	         avoidTolls: false

	         }, function(response, status){

	         	if (status === google.maps.places.PlacesServiceStatus.OK) {

	         	  var dis = parseFloat(response.rows[0].elements[0].distance.text.split(" ")[0]); //khoang cach
	         	  if((dis < maxDistance) && (taxiData.status == 0)){
	         	  	maxDistance = dis;
	         	  	selectedTaxi = taxiKey;
	         	  	selectStringAddress = response.originAddresses[0];
	         	  }
	         	  if(indexQueryTaxi < maxCount - 1){
	         	  	indexQueryTaxi++;
	         	  }else{
	         	  	main.updateForNewTaxi();
	         	  }

	         	}
	         	else{
	         		console.log("fail service distance " + status);
	         	}

	 	});
}