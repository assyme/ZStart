var ZS = ZS || {};
ZS.Constants = {};
ZS.Constants.Containers = 30;
ZS.Gift = {};
ZS.Gift.Pen = 1;
ZS.Gift.Chocolate = 2;
ZS.Gift.Voucher = 3;


ZS.App = ZS.App || function(){
	
	/* private variables */
	var self = this;
	


	/* private functions */
	
	var arr = function newFilledArray(len, val) {
		var rv = new Array(len);
		while (--len >= 0) {
			rv[len] = val;
		}	
		return rv;
	}(ZS.Constants.Containers,ZS.Gift.Pen);
	
	var showGift = function(){
		var parentContainer = $(this).parent('div');
		var idx = parentContainer.data('index');
		$(this).hide();
		
		switch (arr[idx]){
			case ZS.Gift.Pen :
				//parentContainer.html("pen");
				parentContainer.html("<button type='button' class='btn btn-success btn-large btn-block btnPrize disabled'>Sipper</button>");
				//parentContainer.html("<img src = 'images/pen.jpg' alt='Pen'/>");
				$('#dialog img').attr('src',"images/sipper.png");
				break;
			case ZS.Gift.Chocolate:
				parentContainer.html("<button type='button' class='btn btn-danger btn-large btn-block btnPrize disabled'>Mug</button>");
				$('#dialog img').attr('src',"images/mug.png");
				break;	
			case ZS.Gift.Voucher:
				parentContainer.html("<button type='button' class='btn btn-danger btn-large btn-block btnPrize disabled'>Mug</button>");
				$('#dialog img').attr('src',"images/smug.png");
				break;
		}
		$( "#dialog" ).dialog( "open" );
		
	};

	var fillGift = function(howMany,whatGift){
		for (var i=0;i< howMany;i++){
				var added = false;
				while (!added){
					var index = Math.floor(Math.random() * arr.length);
					if (arr[index] == ZS.Gift.Pen){
						arr[index] = whatGift;
						added = true;
					}	
				}
			}
	}

	/* Public Functions */

	self.init = function(){
			console.log("initiliaze");
			/*  events binding */
			$(function() {
				$( "#dialog" ).dialog({
				open:function(){
					setInterval(function(){
				$( "#dialog" ).dialog( "close" );
			},3000);
				},
				closeText: "hide",
				autoOpen: false,
				show: {
					effect: "explode",
					duration: 500
					},
					hide: {
					effect: "explode",
					duration: 1000
		}
		});
  });

			/* render boxes */
			for (var i=1 ; i <= ZS.Constants.Containers ; i++){
				var elm = "<div class='col-6 col-lg-3' data-index='{1}'><button type='button' class='btn btn-primary btn-large btn-block btnPrize'>{0}</button></div>".format(i,i-1);
				$('.mainContainer').append(elm);	
			}

			$('button.btnPrize').on('click',showGift);
			

			/* fill gifts */
			
			var numberOfVoucher = 0; //Math.floor(10/100 * ZS.Constants.Containers); /* 10% occurrance */
			var numberOfChocolates = 13;// Math.floor(30/100 * ZS.Constants.Containers); /* 30% occurrance */
			var numberOfPens = ZS.Constants.Containers - numberOfVoucher - numberOfChocolates;
			//fillGift(numberOfVoucher,ZS.Gift.Voucher)
			fillGift(numberOfChocolates,ZS.Gift.Chocolate);
			console.log(arr);

		}
};

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}
