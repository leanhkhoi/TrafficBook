

function initEventOnTaxi(){
	eventNotifyToTaxiAboutNewPoint();
	eventChangeTaxiPosition();
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
	    	 //console.log("child_changed" + data.val());
	     	 main.showNotify();
	    	}
	    }
	    if(data.key == "type"){
	      signinTaxi.type = data.val();

	    }
	    if(data.key == "lat"){
	    	signinTaxi.lat = data.val();
	    }
	    if(data.key == "lng"){
	    	signinTaxi.lng = data.val();
	    }
	   // alert(data.val());
	   // console.log(data.val() + "on change");
	    //display position

	});

}
function eventChangeTaxiPosition(){
	     //tuy chinh diem cua khach
	 map.addListener('click', function(e) {
	       var data = {
	         lat: null,
	         lng: null
	       }
	       data.lat = e.latLng.lat();
	       data.lng = e.latLng.lng();
	       var p = new google.maps.LatLng(data.lat, data.lng);
	      	//console.log(data);
	       //map.setCenter(p); 
	       //cap nhat vao database cua Taxi
	       if(signinTaxi.status == 0) return;
	       firebase.database().ref('Taxis/' + signinTaxi.key).update({
		       	lat: data.lat,
		       	lng: data.lng
	       }).then(function(){
	       		if(signinTaxi.status == 1) //neu dang don khach
	       		{
	       			reverseGeocodeAddress(map,geocoder,data).then((rs)=>{

	       				//rs ơhai la chuoi
	       				var resultTaxiAddress = rs;
	       				console.log(resultTaxiAddress);
	       				var customerAddress = null;
	       				database.ref("Points/"+ signinTaxi.pointKey + "/cusPos").once('value', function(snapshot_1){
	       					if(snapshot_1.val() != null)
	       					customerAddress = snapshot_1.val();
	       					else console.log("snapshot1 is null");
	       				}).then(function(){
	       					if(customerAddress != null)
	       					showPathOnMap(resultTaxiAddress, customerAddress);
	       					else console.log("customerAddress vs resultTaxiAddress are null");
	       				});
	       				
	       			}).catch(function(error){
	       				console.log(error);
	       			});
	       		}else{
	       			if(signinTaxi.status == 2) //neu danhg cho khach
	       			{
	       				refeshMap();
		       			createMarker(map,p, null, icon);
		       			map.setCenter(p);
	       			}else{

	       			}
	       			
	       		}
	       		
	       });
	       //chuyen dia chi thanh chuoi
	       //findPath
	      
	});

}

function showPathOnMap(taxiPos, clientPos){
	//console.log("new path");
	directionsDisplay.setMap(map);
	directionsService.route({
	      origin:taxiPos,
	      destination: clientPos,
	      travelMode: 'DRIVING'
	    }, function(response, status) {
	      if (status === 'OK') {
	        directionsDisplay.setDirections(response);
	        var taxiPoint = new google.maps.LatLng(signinTaxi.lat, signinTaxi.lng);
	        deleteAllMarker();
	        createMarker(map,taxiPoint, null, icon);
	        map.setCenter(taxiPoint);
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
	deleteAllMarker();
	deleteDirectionService();
	deleteAllMarker();
	createMarker(map,new google.maps.LatLng(signinTaxi.lat, signinTaxi.lng), null, icon);
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
	         	  	selectedDriverName = taxiData.driverName;
	         	  	selectedStringAddress = response.originAddresses[0];
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

function reverseGeocodeAddress(map, geocoder, point){
	var geocoderPromise = new Promise((resolve, reject) => {
		geocoder.geocode({"location": point}, function(results, status) {
		                       if (status === 'OK') {
		                         //console.log(results);
		                       
		                        resolve(results[0].formatted_address);
		                       
		                       }
		                       else reject("failed");
		                     });
	 });   
	return geocoderPromise;
}