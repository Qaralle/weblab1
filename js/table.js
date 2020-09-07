function trytoJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function linecreate(data,i) {
	let line = ""

	console.log(data[i].X)
	line += "<tr>"
	line += "<td>"
	line += "<div id='cell'>"
	line += data[i].X
	line += "</div>"
	line += "</td>"
	line += "<td>"
	line += "<div id='cell'>"
	line += data[i].Y
	line += "</div>"
	line += "</td>"
	line += "<td>"
	line += "<div id='cell'>"
	line += data[i].R
	line += "</div>"
	line += "</td>"
	line += "<td>"
	line += "<div id='cell'>"
	line += data[i].Result
	line += "</div>"
	line += "</td>"
	line += "<td>"
	line += "<div id='cell'>"
	line += data[i].answer_time
	line += "</div>"
	line += "</td>"
	line += "<td>"
	line += "<div id='cell'>"
	line += data[i].date_time
	line += "</div>"
	line += "</td>"
	line += "</tr>"
	return line;
}

function draw_table(data){
	let body = $("#table_body").eq(0)
	let line = ""
	if (trytoJSON(data) && data != ""){

		data=JSON.parse(data)
		for (let i = 0; i <= data.length - 1; i++) {


			line+=linecreate(data,i)


		}
		body.html(line);
	}
}

function update_table(data){

	let body = $("#table_body").eq(0)

	let line = ""


	if (trytoJSON(data)){

		data=JSON.parse(data)
		line=linecreate(data,data.length - 1)
		body.append(line)


		console.log(data.length)

		if (data.length >= 9){
			deleted=data.splice(0,1)

			console.log("i deleted the first element, current length is:"+data.length)
			console.log("deleted element:"+JSON.stringify(deleted))

			newdata=JSON.stringify(data).replace("[","").replace("]","")


			Cookies.set("data", newdata,{path: "/~s283809/test",sameSite:'lax'});
		}

		drawResult(data[data.length-1].X,data[data.length-1].Y,data[data.length-1].R)
	
	}

} 
