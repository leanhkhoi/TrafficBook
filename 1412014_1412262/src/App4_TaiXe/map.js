
function createNewMap(){
		var map = new google.maps.Map(document.getElementById('map'), {
		  zoom: 14,
		  center: {lat: 10.801375268539708, lng: 106.71134233474731},
		  mapTypeControl: false,
		  streetViewControl: false,
		  zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
          }
		});
		map.setCenter(new google.maps.LatLng(signinTaxi.lat, signinTaxi.lng));
		deleteAllMarker();
	    createMarker(map,new google.maps.LatLng(signinTaxi.lat, signinTaxi.lng), null, icon);
		createControlUI(map);
		createService(map);
		return map;
}
function createControlUI(map){
	createStartPickingBtn(map);
	createEndPickingBtn(map);
	createGoingBtn(map);
	createRefreshMapBtn(map);
	createNotifyBtns(map);
}
function createStartPickingBtn(map){
	var chicago = {lat: 41.85, lng: -87.65};

	var control = document.createElement('div');
	var btn =  document.createElement('button');
	control.id = "startPickBtn";
	control.style.display = 'none';
	btn.className = "btn btn-xs btn-primary";
	btn.innerHTML = "Bat Dau";
	
	control.appendChild(btn);
	btn.addEventListener('click', function() {
		//bat dau don khach
		main.showOnGoingBtn();
		main.startPickCustomer();
         
       });
	//control.style.border = '2px solid #fff';
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(control);
	
}
function createGoingBtn(map){
	var chicago = {lat: 41.85, lng: -87.65};

	var control = document.createElement('div');
	var btn =  document.createElement('button');
	control.id = "onGoingBtn";
	control.style.display = 'none';
	btn.className = "btn btn-xs btn-primary";
	btn.innerHTML = "Đã đón";
	
	control.appendChild(btn);
	btn.addEventListener('click', function() {
		//bat dau don khach
		main.showEndPickBtn();
		main.goingOn();
         
       });
	//control.style.border = '2px solid #fff';
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(control);
	
}
function createEndPickingBtn(map){
	var chicago = {lat: 41.85, lng: -87.65};

	var control = document.createElement('div');
	var btn =  document.createElement('button');
	
	btn.className = "btn btn-xs btn-primary";
	btn.innerHTML = "Ket Thuc";
	control.id = "endPickBtn";
	control.style.display = "none";
	control.appendChild(btn);
	btn.addEventListener('click', function() {
		//ket thuc don khach
        main.endPickCustomer();
        main.closeControlBtn();
      });
	//control.style.border = '2px solid #fff';
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(control);

}
function createRefreshMapBtn(map){
	var chicago = {lat: 41.85, lng: -87.65};

	var control = document.createElement('div');
	var btn =  document.createElement('button');
	btn.className = "btn btn-xs btn-primary";
	btn.innerHTML = "Refesh";
	control.appendChild(btn);
	btn.addEventListener('click', function() {
        refeshMap();
    });
	//control.style.border = '2px solid #fff';
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(control);
}

function createNotifyBtns(map){
	var chicago = {lat: 41.85, lng: -87.65};

	var control = document.createElement('div');
	control.id = "notifyPannel";
	control.style.marginTop = "130px";
	//control.style.display = "none";
	
	var buttonAccept = document.createElement("button");
	buttonAccept.id = "acceptPick";
	buttonAccept.className = "btn btn-xs btn-default";
	buttonAccept.style.margin = "5px";
	buttonAccept.innerHTML = "Xac Nhan";

	var buttonDecline = document.createElement("button");
	buttonDecline.id = "declinePick";
	buttonDecline.className = "btn btn-xs btn-default";
	buttonDecline.style.margin = "5px";
	buttonDecline.innerHTML = "Tu Choi";

	var buttonDiv = document.createElement("div");
	buttonDiv.className = "col-sm-12 text-center";
	buttonDiv.appendChild(buttonAccept);
	buttonDiv.appendChild(buttonDecline);

	var stateDiv = document.createElement("div");
	stateDiv.className = "col-sm-12 text-center";
	stateDiv.innerHTML = '<span style="color: green">Có khách yêu cầu</span>';

	var pannelBodyDiv = document.createElement("div");
	pannelBodyDiv.className = "panel-body";
	pannelBodyDiv.appendChild(stateDiv);
	pannelBodyDiv.appendChild(buttonDiv);

	var pannelDiv = document.createElement("div");
	pannelDiv.className = "panel panel-default";
	pannelDiv.style.background = 'white';
	pannelDiv.appendChild(pannelBodyDiv);

	control.appendChild(pannelDiv);

	buttonAccept.addEventListener('click', function() {
		
		//khi chap nhan thi show duong di
		main.closeNotify();
		main.showStartBtn();
		main.isTaxiResponseWaitting = false; //da xac nhan
		main.findPath();
        // alert("accept");
     });
	buttonDecline.addEventListener('click', function() {
		//tim xe khac + set trang thai taxi thanh 0 (dang san sang)
		
		main.closeNotify();
		main.isTaxiResponseWaitting = false; //da xac nhan
		main.findAnotherTaxi();
		
       // alert("decline");
    });
	
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
	control.style.display = "none";

	/*<div id="notifyRow" style="display: none;">
			<div class="panel panel-default" style="background: black;">
		   		<div class="panel-body">
		   		 	<div class="col-sm-12 text-center"><span style="color: green">Có khách yêu cầu</span></div>
		   		 	<div class="col-sm-12 text-center">
		   		 		<button class="btn btn-xs btn-default">Xac nhận</button>			   		 		
		   		 		<button class="btn btn-xs btn-default">Tu Choi</button>
		   		 	</div>
		   		</div>
		 	</div>
	</div>*/
	
}

function createService(map){
	directionsService = new google.maps.DirectionsService;
	directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);
	geocoder = new google.maps.Geocoder();
}
function initMap(){

}