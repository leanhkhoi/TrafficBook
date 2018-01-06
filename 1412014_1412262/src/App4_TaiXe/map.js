
function createNewMap(map){
		map = new google.maps.Map(document.getElementById('map'), {
		  zoom: 14,
		  center: {lat: 10.801375268539708, lng: 106.71134233474731},
		  mapTypeControl: false,
		  streetViewControl: false,
		  zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
          }
		});
		createControlUI(map);
}
function createControlUI(map){
	createBottomLeftBtn(map);
	createBottomRightBtn(map);
	createBottomCenterBtn(map);
}
function createBottomRightBtn(map){
	var chicago = {lat: 41.85, lng: -87.65};

	var control = document.createElement('div');
	var btn =  document.createElement('button');
	btn.className = "btn btn-xs btn-primary";
	btn.innerHTML = "Bottom Right";
	
	control.appendChild(btn);
	btn.addEventListener('click', function() {
         map.setCenter(chicago);
       });
	//control.style.border = '2px solid #fff';
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(control);
}
function createBottomLeftBtn(map){
	var chicago = {lat: 41.85, lng: -87.65};

	var control = document.createElement('div');
	var btn =  document.createElement('button');
	btn.className = "btn btn-xs btn-primary";
	btn.innerHTML = "Bottom Left";
	
	control.appendChild(btn);
	btn.addEventListener('click', function() {
         map.setCenter(chicago);
       });
	//control.style.border = '2px solid #fff';
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(control);
}
function createBottomCenterBtn(map){
	var chicago = {lat: 41.85, lng: -87.65};

	var control = document.createElement('div');
	var btn =  document.createElement('button');
	btn.className = "btn btn-xs btn-primary";
	btn.innerHTML = "Bottom Center";
	control.appendChild(btn);
	btn.addEventListener('click', function() {
         map.setCenter(chicago);
       });
	//control.style.border = '2px solid #fff';
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(control);
}
function initMap(){

}