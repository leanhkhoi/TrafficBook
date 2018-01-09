function InitVue(main){

	var main = new Vue({
		el: '#main',
		data: {
		  	isCollapse : false,
		  	login :false,
		    message: 'Hello Vue World',
		    style: "color:black; display: none;background: #FAFAFA;border: 0px solid black;border-radius: 20px;",
		    isTaxiResponseWaitting: false,
		    count: 0
		},
		created: function(){
			firebase.initializeApp(config);
			database = firebase.database();
			auth = firebase.auth();
			this.waitToAuth();
			setTimeout(function(){ 
				if(auth.currentUser != null) //sau co 3 giay ma xac thuc da sign in thi chuyen sang man hinh map
				{
					if(auth.currentUser.uid!=null)
					main.SignInAsTaxi(auth.currentUser);
				}
				else //neu khong thi chyen sang man hinh dang nhap
				{
					main.setLoginPageStyle();
				}
				$("#waithScreen").html("");
			},
			2500);

		},
		mounted: function() {
		  	
		  	
		},
		updated: function(){
		  	
		},
	    methods:
		{
		  	signin: function(){
		  		var email = $("#emailInput").val().toString();
		  		var password = $("#pwdInput").val().toString();
		  		
		  		var log;
		  		auth.signInWithEmailAndPassword(email,password)
			    	.then(function(data){
			    		main.SignInAsTaxi(data);
			    	})
			    	.catch(function(error) {
			    		  // Handle Errors here.
			    		  var errorCode = error.code;
			    		  var errorMessage = error.message;
			    		  console.log(errorMessage);
			    		  alert("Mat khau nhap vao khong dung");
			    		  // ...
			    	});
			
		  		//alert(email + " " + password);
		  	},
		  	signout: function(){

		  		if(this.login==true){
		  			auth.signOut().then(function() {
					  // Sign-out successful.
			 		  database.ref('Taxis/' + signinTaxi.key).update({ //cap nhat tren fire taxi da dang xuat
	                   	onoff: 0
	                  });
					  main.login = false; // set ve chua dangnhap
					  signinTaxi = {}; //clear data cua taxi
					  alert("Logout Success"); //thong bao thanh cong
					  main.setLoginPageStyle();// chuyen man hinh sang trang login

					}).catch(function(error) {
					  // An error happened.
					  console.log(error);
					});
		  			
		  		}else{
		  			alert("No account to log out");
		  		}
		  	},
		  	navCollapse: function(){

		  		if(this.isCollapse == false){
		  			//alert(this.isCollapse );
		  			this.isCollapse=true;
		  			$("#map").css("height","50%");
		  			$("#main").css("height","50%");

		  			
		  		}
		  		else
		  		{
		  			//alert(this.isCollapse);
		  			this.isCollapse=false;
		  			$("#map").css("height","88%");
		  			$("#main").css("height","10%");

		  		}

		  	},
		  	setMapPageStyle: function(){
		  		$("#main").css("display","block");
		  		$("#map").css("display","block");
		  		
				$("#main").css("height","10%");
		  		$("#map").css("height","88%");

		  		$("#main").css("width","100%");
		  		$("#map").css("width","100%");


		  		$("#appNameRow").css("display","none");
		  		$("#loginRow").css("display","none");
		  		$("#navbarRow").css("display","block");
		 		
		  	},
		  	setLoginPageStyle: function(){

		  		$("#main").css("display","block");
		  		$("#map").css("display","none");
		  		
				$("#main").css("height","100%");
		  		$("#map").css("height","0%");

		  		$("#main").css("width","100%");
		  		$("#map").css("width","100%");

		  		$("#appNameRow").css("display","block");
		  		$("#loginRow").css("display","block");
		  		$("#navbarRow").css("display","none");
		  	},
		  	setDataForSigning: function(childSnapshot){
		  		var childData = childSnapshot.val();
		  		signinTaxi.key = childSnapshot.key;
			 	signinTaxi.cusPhonenumber = childData.cusPhonenumber;
			 	signinTaxi.driverName = childData.driverName;
			 	signinTaxi.lat = childData.lat;
			 	signinTaxi.lng = childData.lng;
			 	signinTaxi.onoff = childData.onoff;
			 	signinTaxi.pointKey = childData.pointKey;
			 	signinTaxi.status = childData.status;
			 	signinTaxi.type = childData.type;
			 	signinTaxi.uid = childData.uid;
			 	
		  	},
		  	SignInAsTaxi: function(data){
				var taxisRef = database
			   .ref("Taxis")
			   .once('value', function(snapshot) {
						snapshot.forEach(function(childSnapshot) {
							var childData = childSnapshot.val();
							if(childData.uid == data.uid){	
							 	main.setDataForSigning(childSnapshot); //set tat ca cac thuoc tinh cua taxi tren firebase ve cho signinTaxi
				 			 	if(signinTaxi.onoff == 0){ //neu chua dang nhap
				 			 		signinTaxi.onoff = 1;
				 			 		database.ref('Taxis/' + signinTaxi.key).update({ //update da login tren taxis
				 	                  onoff: 1
				 	                });
				 	                
				 			 	}
				 			 	main.login = true;
							}

					});

				})
			    .then(function(data){
			    	if(main.login == true){
			    		main.setMapPageStyle(); // chuyen man hinh sang trang main
			    		map = createNewMap();
			    		initEventOnTaxi();
			    	}else{
			    		alert("Login that bai");
			    		
			    	}
				});
		  	},
		  	autoSignin: function(){
		  		alert("message?: DOMString");
		  	},
		  	waitToAuth: function(){
		  	
		  		$("#main").css("display","none");
		  		$("#map").css("display","none");
		  		$("#waithScreen").html("<h2 style='color:green;'>WAIT TO AUTHENTICATE</h2>")
		  	},

		  	showNotify: function(){

		  		$("#notifyPannel").css("display","block");
		  		if(!this.isTaxiResponseWaitting){
		  			this.isTaxiResponseWaitting = true;
		  			setTimeout(function(){
		  				if(main.isTaxiResponseWaitting == true){ // sau 5 s ko co phan hoi
		  					main.closeNotify();
		  					main.isTaxiResponseWaitting = false;
		  					main.findAnotherTaxi();
		  				}
		  			}, 10000);
		  		}
		  	},
		  	closeNotify: function(){
		  		$("#notifyPannel").css("display","none");
		  	},
		  	findPath: function(){
		  		//input 
		  		//taxilocation
		  		var taxiLocation = null;
		  		var clientLocation = null;
		  		database.ref("Points/"+signinTaxi.pointKey + "/cusPos")
		  		.once('value', function(snapshot_0) {
		  			if(snapshot_0.val() != null)
		  				clientLocation = snapshot_0.val();
		  			else {
		  				console.log("snapshot is null");
		  			}
   				}).then(function(){
					database.ref("Points/"+signinTaxi.pointKey + "/taxiPos").once('value', function(snapshot_1){
						if(snapshot_1.val() != null)
						taxiLocation = snapshot_1.val();
						else console.log("snapshot1 is null");
					}).then(function(){
						if(taxiLocation!= null && clientLocation!= null)
						showPathOnMap(taxiLocation, clientLocation);
						else console.log("clientLocation vs taxiLocation are null");
					});
   				});

		  	},
		  	
		  	findAnotherTaxi: function(){
		  		//random taxi
		  		//tim tat ca cac taxi, cai nao gan nhat thi lay
		  		var taxisRef = database.ref("Taxis")
		  		.once('value', function(snapshot) {
		  		  var length = (Object.keys(snapshot.toJSON()).length);
		  		  snapshot.forEach(function(childSnapshot) {
		  		    var childKey = childSnapshot.key;
		  		   	var childData = childSnapshot.val();
		  		   	//var consideredTaxiPoint = new google.maps.LatLng(childData.lat, childData.lng);
		  		   	//var currentTaxiPoint = new google.maps.LatLng(signinTaxi.lat, signinTaxi.lng);
		  		   	//tim ra taxi gan voi taxi nay nhat
		  		   	considerTaxiToPickNext(map,childData, childKey,length);
		  		   
		  		  });
		  		});
		  		
		  	},
		  	updateForNewTaxi: function(){
		  		if(selectedTaxi != null){ //tim duo taxi phu hop
		  			/*firebase.database().ref('Taxis/' + selectedTaxi + "/driverName").once('value', function(snapshot) {
		  					console.log(selectedTaxi + " distance = " + maxDistance + " taxi: " + snapshot.val());
		  					//alert(snapshot.val());
		  			});*/
		  			console.log("driverName: "+ signinTaxi.driverName);
		  			firebase.database().ref('Points/' + signinTaxi.pointKey).update({
		  				taxiPos: selectedStringAddress,
		  				driverName: selectedDriverName
		  				
		  			}).then(function(){
		  				firebase.database().ref('Taxis/' + selectedTaxi).update({
		  				
		  				  status: 3, //thiet lap dang ban phan hoi voi he thong
		  				  cusPhonenumber: signinTaxi.cusPhonenumber,
		  				  type: signinTaxi.type,
		  				  pointKey: signinTaxi.pointKey
		  				
		  				}).then(function(data){
		  					
		  					resetUnstableAppAttribute();
		  					main.setReady();
		  					alert("Da chuyen sang taxi khac");
		  				});
		  			});

		  		}
		  		else{
		  			alert("selectedTaxi is null");
		  		}

		  	},
		  	setReady: function(){
		  		//set status = 0
		  		database.ref('Taxis/' + signinTaxi.key).update({ //update da login tren taxis
                  cusPhonenumber: 0,
                  pointKey: 0,
                  status: 0, //san sang don kahch tiep theo
                  type: 0
                });
                refeshMap();
		  	},
		  	startPickCustomer: function(){
		  		//set status = 1
		  		database.ref('Taxis/' + signinTaxi.key).update({
		  			status: 1 //dang tren duong don khach
		  		}).then(function(){
			  		firebase.database().ref('Points/' + signinTaxi.pointKey).update({
			  			status: 2 //thiet lap dang tren duong toi don cho Point	
		  			});
		  		});
		  	},
		  	goingOn: function(){
		  		database.ref('Taxis/' + signinTaxi.key).update({
		  			 status: 2 //đã đón khách và đang đi
		  		}).then(function(){
		  			firebase.database().ref('Points/' + signinTaxi.pointKey).update({
			  			status: 3 //Đã đón và đang đi
		  			});
		  		});
		  	},
		  	endPickCustomer: function(){
		  		//set staus = 0
		  		firebase.database().ref('Points/' + signinTaxi.pointKey).update({
		  				status: 4 //hoan thanh
		  				
	  			}).then(function(){
	  				main.setReady();
				});	
		  		

		  	},
		  	showOnGoingBtn: function(){
		  		//alert("ongoing");
				$("#startPickBtn").css("display","none");
				$("#onGoingBtn").css("display","block");
				$("#endPickBtn").css("display", "none");
		  	},
			showEndPickBtn: function(){
				$("#startPickBtn").css("display","none");
				$("#onGoingBtn").css("display", "none");
				$("#endPickBtn").css("display", "block");
			},
			showStartBtn: function(){
				$("#startPickBtn").css("display","block");
				$("#onGoingBtn").css("display", "none");
				$("#endPickBtn").css("display", "none");
			},
			closeControlBtn: function(){
				$("#startPickBtn").css("display","none");
				$("#onGoingBtn").css("display", "none");
				$("#endPickBtn").css("display", "none");
			},
		    countUp: function() {
		      this.count += 1
		    },
		    countDown: function() {
		      this.count -= 1
		    }

		}

	})

	return main;
}

