function getSign(x){
	if (x<0){
		return -1;
	}else{
		return 1;
	}

}


function coordinate_arrow(context, x0, y0, x1, y1) {

	var length_head =7
	var delta_x = x0 - x1;

	context.font='15px courier new';

    context.beginPath()
    context.lineWidth = 2
    context.moveTo(x0, y0)
    context.lineTo(x1, y1)
  	context.stroke()


    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x1+(getSign(delta_x)*length_head),y1+(getSign(delta_x)*length_head))
    context.lineTo(x1-length_head,y1+length_head)
    context.fill()

}

function getDashLength(x,y){
	let dash_length

	console.log(x,y)

	if(x>y){
		dash_length = y / 6
	}else{
		dash_length = x / 6
	}

	return dash_length


}

function coordinate_system(context, height_pers, width_pers){

	let dash_length
	let R_value=$('input[name=R]:checked').val()
	let R=[]
	R[0]=R_value
	R[1]=R_value/2
	R[2]=-R_value/2
	R[3]=-R_value

	console.log(R)

	context.strokeStyle = "black";
	context.fillStyle = "black";
 

	y=context.canvas.height*height_pers
	x=context.canvas.width*width_pers

	y_coef=(context.canvas.height-y)/2
	x_coef=(context.canvas.width-x)/2

	dash_length=getDashLength(x,y)

	coordinate_arrow(context, x_coef , context.canvas.height *0.5, context.canvas.width - x_coef, context.canvas.height *0.5)
	context.fillText('X', context.canvas.width - x_coef, context.canvas.height * 0.5+15)
	coordinate_arrow(context, context.canvas.width *0.5, context.canvas.height - y_coef, context.canvas.width *0.5, y_coef)
	context.fillText('Y', context.canvas.width * 0.5+10, y_coef+5)

	let counterx=0

	for (let i = -2; i <=2 ; i++) {
		if (i !=0){
			context.fillText(R[counterx],context.canvas.width/2+6,context.canvas.height/2+dash_length*i+5)
			context.beginPath()
		    context.moveTo(context.canvas.width/2-4,context.canvas.height/2+dash_length*i)
		    context.lineTo(context.canvas.width/2+4,context.canvas.height/2+dash_length*i)
		    context.stroke()
		    counterx++
		}
	}

  	let countery=3
	for (let i = -2; i <=2 ; i++) {
		if(i != 0){
			console.log(dash_length)
			context.fillText(R[countery],context.canvas.width/2+dash_length*i-5, context.canvas.height/2-10)
		    context.beginPath()
		    context.moveTo(context.canvas.width/2+dash_length*i, context.canvas.height/2+4)
		    context.lineTo(context.canvas.width/2+dash_length*i, context.canvas.height/2-4)
		    context.stroke()
		    countery--
		}
	}


}
function draw(){

	let context =  $('#canvas')[0].getContext('2d')

	context.clearRect(0, 0, context.canvas.width, context.canvas.height)

	let R = getDashLength(context.canvas.width*0.95, context.canvas.height*0.95)

	context.strokeStyle = "green"
    context.fillStyle = "green"

	context.fillRect(context.canvas.width/2,context.canvas.height/2,2*R,2*R)

    context.beginPath()
    context.moveTo(context.canvas.width/2,context.canvas.height/2);
    context.lineTo(context.canvas.width/2-R,context.canvas.height/2);
    context.lineTo(context.canvas.width/2,context.canvas.height/2-R);
    context.fill()

    context.beginPath()
    context.moveTo(context.canvas.width/2,context.canvas.height/2)
    context.arc(context.canvas.width/2,context.canvas.height/2,R,0,-Math.PI/2,true)
    context.fill()

	coordinate_system(context,0.95,0.95)

}

function drawResult(x,y,R){
	let context =  $('#canvas')[0].getContext('2d')
	let dash_length = 2*getDashLength(context.canvas.width*0.95, context.canvas.height*0.95)/R

	draw()

	context.strokeStyle = "blue"
    context.fillStyle = "blue"

	context.beginPath()
	context.moveTo(context.canvas.width/2+x*dash_length,context.canvas.height/2-y*dash_length)
	context.arc(context.canvas.width/2+x*dash_length,context.canvas.height/2-y*dash_length,4,0,2*Math.PI)
	context.fill()
}

$(window).on("load",draw)
$(window).resize(draw)
$('input[name=R]:radio').on("change", draw)