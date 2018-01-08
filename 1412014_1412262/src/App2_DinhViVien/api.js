 class Api {
         constructor(){
               this.api_map = null;
               this.api_markers = [];
               this.api_geocoder = null;
               this.api_directionsDisplay = null;
               this.api_directionsService = null;
         }

         defaultInit(){
   
               this.api_map = new google.maps.Map(document.getElementById('map'), {
                 zoom: 14,
                 center: {lat: 10.801375268539708, lng: 106.71134233474731}
               });

               this.api_directionsService = new google.maps.DirectionsService;
               this.api_directionsDisplay = new google.maps.DirectionsRenderer;
               this.api_directionsDisplay.setMap(this.api_map);
                //phat sinh hinh tron va ghi vao database
                //initCircle(map);
               
               //doc tu firebase các điểm và hiển thị lên bản đồ
                //ReadTaxisLocation(map);

               // isKeyExist("LocatedApps");

                //tao geocoder de chuyen locations tring-> point
               this.api_geocoder = new google.maps.Geocoder();
              
         }

         listenEventAdjustLocation(){
               //tuy chinh diem cua khach
           this.api_map.addListener('click', function(e) {
                 var data = {
                   lat: null,
                   lng: null
                 }
                 data.lat = e.latLng.lat();
                 data.lng = e.latLng.lng();
                 this.api_map.setCenter(new google.maps.LatLng(data.lat, data.lng));

                 //clear all previous maker 
                 this.clearOverlays();
                 appAttributes.setDefaultSearchTaxiConfig();
                 //rever geocoder

                 //thuc thi khi viec dich geocode tu point sang chuoi
                 appAttributes.ExecuteLocationFromChangeOnMap(data);
                
          });

         }

         clearOverlays() {
          
           for (var i = 0; i < this.api_markers.length; i++ ) {
             this.api_markers[i].setMap(null);
           }
           this.api_markers=[];
           if(this.api_directionsDisplay!=0)
           this.api_directionsDisplay.setMap(null);
           //directionsDisplay.setDirections(null);

         }
         geocodeAddress(geocoder, resultsMap, address, reverse) {

                var geocoderPromise = new Promise((resolve, reject) => {
                   
                    if(reverse){
                     
                      geocoder.geocode({"location": address}, function(results, status) {
                        if (status === 'OK') {
                          //console.log(results);
                        
                         resolve(results[0].formatted_address);
                        
                        }
                        else reject("failed");
                      });
                    } 
                    else{
                      geocoder.geocode({"address": address}, function(results, status) {
                        
                        if (status === 'OK') { 
                         
                          resolve(results[0].geometry.location);
                        
                        }else{

                          reject("error with calculation");

                        }

                      });

                    } 

                   

                  });   
                return geocoderPromise;
         }

         createMarker(map, point, content,icon) {
            //x++;
            var marker = new google.maps.Marker({
              position: point,
              map: map,
              icon: icon
              //title: String(x)
            });

            this.api_markers.push(marker);
           
         }
 

}