   class App {

       constructor(){
              this.app_countTaxis= 0;
              this.app_maxDistance= 1.0;
              this.app_minDistance= 1.0;
              this.app_originCustomerPoint= 0,
              this.app_currentCustomerPoint= 0,
              this.app_originStringAddess= 0,
              this.app_currentStringAddress= 0,
              this.app_founded= false
        }

        setDefaultSearchTaxiConfig(){
          this.app_countTaxis = 0;
          taxiInfo = {
            location: null,
            driverName : null,
            status: null,
            key: null,
            pointKey: null,
            selectedDriverStringAddress: 0
          }
         // appAttributes.app_currentStringAddress = 0;
          this.app_maxDistance = 1.0;
          this.app_minDistance = 1.0;
        }

        ExecuteLocationFromChangeOnMap(data){
              apiAttributes.geocodeAddress(apiAttributes.api_geocoder, apiAttributes.api_map, data,1).then(function(success){
                if(success){

                  //sau khi geocoder thanh cong thi tim cac xe xung quanh
                   //success tra ve dua chi cua khach
                  // ReadTaxisLocation(success,map,300);
                  //cap nhap lai tren firebase
                  appAttributes.app_currentCustomerPoint = data;
                  apiAttributes.createMarker(apiAttributes.api_map, data, null, null);
                  //doc vi tri cac xe xung quanh
                 // ReadTaxisLocation(data,map);

                  //cap nhat vi tri thay doi tren app 2
                  appAttributes.UpdateCustomerAddress(success);
                }
               
              }).catch(function(error){

                //console.log("error đã xảy ra" + error);
              });

        }

        ExecuteLocationFromPhoneApp(address){
         
          this.app_originStringAddess = address;
          this.app_currentStringAddress = address;

          //geocode dia diem va load cac xe khi thanh cong
          apiAttributes.geocodeAddress(apiAttributes.api_geocoder, apiAttributes.api_map, address,null).then((success)=>{
            
            if(success){
              appAttributes.app_currentCustomerPoint = success;
              appAttributes.app_originCustomerPoint = success;
              appAttributes.app_founded = true; 
              //alert(sucess);
              //hien vi tri khach tren ban do
              apiAttributes.createMarker(apiAttributes.api_map, success, null, null);
              apiAttributes.api_map.setCenter(success);
              //sau khi geocoder thanh cong thi tim cac xe xung quanh
              //success tra ve dua chi cua khach
             
              //console.log(success);

              /*Sau do cap nhat len app 3 là đã định vị thành công*/
              //
            }
            
          }).catch((error)=>{
            //tim khong duoc vi tri
            
            appAttributes.app_currentStringAddress = 0;
            appAttributes.app_founded = false;
            alert("Không thể tìm thấy điểm. Bấm vào 'Gửi cho app 3' để hoàn tất phiên làm việc này" + error );
            //alert("Khong tim duoc vi tri tren ban do")
            
            //khong tim duoc vi tri thi them vai Point diem chua dc dinh vi

            //set avaible = 1


            //console.log("sadasd");

          });
        }

      

        ReadTaxisLocation(customerLocation,map){

          if(customerLocation===0)
          {
            
             return;
          }
          else{
            
           var taxisRef = database.ref("Taxis")
           .once('value', function(snapshot) {
             snapshot.forEach(function(childSnapshot) {
               var childKey = childSnapshot.key;
               var childData = childSnapshot.val();
               var point = new google.maps.LatLng(childData.lat, childData.lng);
               var _driverName = childData.driverName;
               var _status = childData.status;
               //point bieu hien cho 1 xe
               //tinh toan khoang cach de xem co the hien thi xe nay` ko
               appAttributes.displayOrNot(customerLocation, point ,map, _driverName,_status,childKey);
               //createMarker(map, point, null, icon);
               //console.log("childKey: " + childKey + "..." + "childData: " + childData.driverName);
             });
           });
           // var taxis = database.child('Taxis');
            //console.log(taxisRef);
           }

         }

         displayOrNot(customerLocation,point, map,_driverName, _status, _key){
           var infowindow = new google.maps.InfoWindow();
           var service = new google.maps.DistanceMatrixService;
           
           service.getDistanceMatrix({
             origins: [point],
             destinations: [customerLocation],
             travelMode: 'DRIVING',
             unitSystem: google.maps.UnitSystem.METRIC,
             avoidHighways: false,
             avoidTolls: false

              }, function(response, status){
                 if (status === google.maps.places.PlacesServiceStatus.OK) {

                   var dis = parseFloat(response.rows[0].elements[0].distance.text.split(" ")[0]);
                   
                   if((dis < appAttributes.app_maxDistance) && (appAttributes.app_countTaxis < 10) && (_status == 0)){
                         //chon ra xe co khoang cach ngan nhat
                         if(dis < appAttributes.app_minDistance){
                          //console.log(dis);
                           appAttributes.app_minDistance = dis;
                           taxiInfo.key = _key;
                           taxiInfo.status= _status;
                           taxiInfo.location = point;
                           taxiInfo.driverName = _driverName;
                           taxiInfo.selectedDriverStringAddress = response.originAddresses[0];
                           //console.log(taxiInfo.selectedDriverStringAddress + " to " + appAttributes.app_currentStringAddress );
                         }

                         appAttributes.app_countTaxis++;

                         console.log(dis + " " + response.originAddresses[0] + "to" + response.destinationAddresses[0]);
                         apiAttributes.geocodeAddress(apiAttributes.api_geocoder, map,response.originAddresses[0],null).then(function(success, fail){
                           if(success){

                             apiAttributes.createMarker(map, success, null, icon);
                             
                           }
                           
                           if(fail) console.log(fail);
                        
                         });  
                        // console.log(response.originAddresses[0]);
                       }

                 }
                 else{
                  console.log("fail service distance" + status);
                 }

              });
          
         }

        AddListenerWhenReceivePoint(){
            //listen firebase
            var locatersRef = database.ref('LocatedApp/locaters/' + myClientInfo.index);
            locatersRef.on('child_changed', function(data) {
            //setCommentValues(postElement, data.key, data.val().text, data.val().author);
               // clearOverlays();

                if(data.key == "location") {
                  apiAttributes.clearOverlays();
                  appAttributes.setDefaultSearchTaxiConfig();
                  appAttributes.updateAvailable(0);
                  myClientInfo.available = 0;
                  myClientInfo.location = data.val();
                  appAttributes.ExecuteLocationFromPhoneApp(data.val());
                }
                if(data.key == "phonenumber"){
                  myClientInfo.phonenumber = data.val();
                }
                if(data.key == "key"){
                  myClientInfo.key = data.val();
                }
                if(data.key == "type"){
                  myClientInfo.type = data.val();
                }
               // alert(data.val());
               // console.log(data.val() + "on change");
                //display position

            });
            locatersRef.on('child_added', function(data) {
            //setCommentValues(postElement, data.key, data.val().text, data.val().author);
               // clearOverlays();
                  
              if(data.key == "location") {
                apiAttributes.clearOverlays();
                appAttributes.setDefaultSearchTaxiConfig();
                myClientInfo.location = data.val();
              
               }
              if(data.key == "phonenumber"){
                  myClientInfo.phonenumber = data.val();
              }
              if(data.key == "key"){
                  myClientInfo.key = data.val();
              }
              if(data.key == "type"){
                  myClientInfo.type = data.val();
              }
               // alert(data.val());
                //console.log(data.val() + "on add");
                //display position

            });

            //set available = 0;
         }
         
        findclient(){
           
           var findClientPromise = new Promise((resolve, reject) => {

             var locationRef = database.ref("LocatedApp/locaters")
             .once('value', function(snapshot) {
               snapshot.forEach(function(childSnapshot) {
                 var childKey = childSnapshot.key;
                 var childData = childSnapshot.val();
                 //console.log("onoff=" + childData.onoff + " " + "Available=" + childData.available);
                 if(childData.onoff == 0){
                   //console.log(childKey);
                   myClientInfo.index = childKey;
                   myClientInfo.key = childData.key;
                   myClientInfo.phonenumber = childData.phonenumber;
                   myClientInfo.location = childData.location;
                   myClientInfo.available = childData.available;
                   myClientInfo.type = childData.type;
                   resolve(true);
                   
                 }
               });
               reject("Khong co san");
             });

           });
           return findClientPromise;
           
         }

        UpdateCustomerAddress(customerLocation){
          console.log(customerLocation);
          this.app_currentStringAddress = customerLocation;
        }

        TurnOffClient(){
            firebase.database().ref('LocatedApp/locaters/' + myClientInfo.index).update({
              
              onoff: 0
            });
          }
        TurnOnClient(){
            firebase.database().ref('LocatedApp/locaters/' + myClientInfo.index).update({
            
              onoff: 1
              
            });
          }

        SendPointStatusBackPhoneApp(){
          //phonenumber and key
          if(this.app_founded== true)
            if(taxiInfo.selectedDriverStringAddress!=0)
              var phonecallRed = firebase.database().ref('Phonecalls/' + myClientInfo.phonenumber + "/locations/" + myClientInfo.key).update({
                
                status: 1
              });
            else
              var phonecallRed = firebase.database().ref('Phonecalls/' + myClientInfo.phonenumber + "/locations/" + myClientInfo.key).update({
                
                status: 2
              });
         }

         SendPointToManagerApp(){
           
            if(this.app_founded == true) {
              if(this.app_countTaxis==0){
                var phonecallRed = firebase.database().ref('Points').push({
                  cusPos: appAttributes.app_originStringAddess,
                  status: 1
                });
               
              }
              else{
                var pointRef = firebase.database().ref('Points').push({
                  cusPos: appAttributes.app_originStringAddess,
                  taxiPos: taxiInfo.selectedDriverStringAddress,
                  driverName : taxiInfo.driverName,
                  status: 2
                });
                
                //gan key cuar Point cho taxi 
                taxiInfo.pointKey = pointRef;
                console.log(taxiInfo.driverName);
              }
            }else{
              var pointRef = firebase.database().ref('Points').push({
                cusPos: this.app_originStringAddess,
                status: 0
              });
              
            }


         }


         updateTaxiToPickCustomer(){
          if((taxiInfo.key!= null) && (taxiInfo.pointKey != null)){

           // alert(taxiInfo.key);
            firebase.database().ref('Taxis/' + taxiInfo.key).update({
            
              status: 3, //thiet lap dang ban phan hoi voi he thong
              cusPhonenumber: myClientInfo.phonenumber,
              type: myClientInfo.type,
              pointKey: taxiInfo.pointKey.toString().split("https://trafficbookapp.firebaseio.com/Points/")[1]
            
            });
          }
         }


        updateAvailable(value){
          firebase.database().ref('LocatedApp/locaters/' + myClientInfo.index).update({
          
            available: value
            
          });
         }

     }
