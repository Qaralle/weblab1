var id
 	 	
var handler = function (){
	if ($(this).attr("flag")=="selected"){


		let selected_id=$("[flag='selected']").attr("id")
		$(this).attr("value", selected_id)
		$(this).attr("flag","choice")
		id=undefined;
	} else {

		id = $(this).attr('id');
	   	$(this).attr('value',"selected: "+id)


	    let selected_id=$("[flag='selected']").attr("id")
	    $("[flag='selected']").attr("value",selected_id)
	    $("[flag='selected']").attr("flag","choice")

		$(this).attr('flag','selected')
	}
	validate()
}


function isANumber( n ) {
    var numStr = /^[\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$|\.$/;
    return numStr.test(n);
}

$(function () {
	$("[flag='choice']").bind('click', handler)
	validate();
	draw_table("["+Cookies.get("data")+"]")
	$('#first').keypress(function (event) {
	    if (event.which == '13') {
	        event.preventDefault()
	    }
	})
	
});


function validateValue(inp){
    let val = parseFloat(inp.value.replace(',','.'))

    if (isNaN(val) || inp.value.replace(',','.').split('.').length>2 || !isANumber(inp.value.replace(',','.'))){

        return false
    }

    return val <= 5 && val >= -5

}
function validButton(){
	if(typeof id=="undefined"){
		return false
	}
	return true
}

function validate() {
	$("#eighth")[0].disabled = !(validateValue($("#first")[0])  && validButton());
}

var form = $("[name='testform']")

function fsubmit(){
	$('#first')[0].value =$('#first')[0].value.replace(',','.')
	$.post({
			url: "test.php",
			data: $('[serialize="true"]').serialize()+"&Y="+id,
			success: result =>{		
				if(result){
					
					update_table("["+Cookies.get("data")+"]")

				}else{
					alert("Не трогай клиент!")
				}
			

			}
	});
}


function testofserialize(){
	alert($('[serialize="true"]').serialize()+"&Y="+id)
}

