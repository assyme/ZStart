var ZS = ZS || {};
ZS.Constants = {};
ZS.Constants.Containers = 20;
ZS.Gift = {};
ZS.Gift.Pen = 1;
ZS.Gift.Chocolate = 2;
ZS.Gift.Voucher = 3;


ZS.App = ZS.App || function(){
	
	/* private variables */
	var self = this;
	var arr = Array(ZS.Constants.Containers);


	/* private functions */

	var showGift = function(){
		var parentContainer = $(this).parent('div');
		var idx = parentContainer.data('index');
		$(this).hide();
		switch (arr[idx]){
			case ZS.Gift.Pen :
				parentContainer.html("pen");
				break;
			case ZS.Gift.Chocolate:
				parentContainer.html("Chocolate");
				break;	
			case ZS.Gift.Voucher:
				parentContainer.html("Voucher");
				break;
		}
		
		
	};

	var fillGift = function(howMany,whatGift){
		for (var i=0;i< howMany;i++){
				var added = false;
				while (!added){
					var index = Math.floor(Math.random() * arr.length);
					if (arr[index] == null){
						arr[index] = whatGift;
						added = true;
					}	
				}
			}
	}
	var fillEmpty = function(whatGift){
		for (var i=0 ; i<= arr.length; i++){
			if (arr[i] == null){
				arr[i] = whatGift;
			}
		}
	}

	/* Public Functions */

	self.init = function(){
			console.log("initiliaze");
			/*  events binding */
			

			/* render boxes */
			for (var i=1 ; i <= ZS.Constants.Containers ; i++){
				var elm = "<div class='col-6 col-lg-3' data-index='{0}'><button type='button' class='btn btn-primary btn-large btn-block btnPrize'>{0}</button></div>".format(i,i-1);
				$('.mainContainer').append(elm);	
			}

			$('button.btnPrize').on('click',showGift);
			

			/* fill gifts */
			var numberOfVoucher = Math.floor(10/100 * ZS.Constants.Containers); /* 10% occurrance */
			var numberOfChocolates = Math.floor(30/100 * ZS.Constants.Containers); /* 30% occurrance */
			var numberOfPens = ZS.Constants.Containers - numberOfVoucher - numberOfChocolates;
			fillGift(numberOfVoucher,ZS.Gift.Voucher)
			fillGift(numberOfChocolates,ZS.Gift.Chocolate);
			fillEmpty(ZS.Gift.Pen);
			

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
