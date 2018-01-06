class abc {
		constructor(){
			this.va = 10;
		}

		addToNumber(number){
			alert(this.va + number);
		}
		promise(){
			return new Promise(function(resolve, reject) {
                setTimeout(function () { console.log("did this ");  resolve("self");  }, 2000);
            })
		}
	}
class avc{
	constructor(){
		this.vari = 5;
	}
	noti(abcOject){
		//y.addToNumber(200);
		//this.xyx(this.vari);
		//xxx();
		alert(t);
	}

	excutepromise(){
		y.promise().then((data)=>{
			alert(data);
		}).catch((error)=>{
			alert(error);
		});
	}
	xyx(number){
		alert(100 + number);
	}
}
function xyx (number){
	alert(10 + number);
}