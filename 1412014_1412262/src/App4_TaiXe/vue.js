function InitVue(main){

	main = new Vue({
		el: '#main',
		data: {
		  	isCollapse : false,
		  	login :false,
		    message: 'Hello Vue World',
		    style: "color:black; display: none;background: #FAFAFA;border: 0px solid black;border-radius: 20px;",
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
			    		
			    		createNewMap(map);
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
		    countUp: function() {
		      this.count += 1
		    },
		    countDown: function() {
		      this.count -= 1
		    }

		}

	})


}

