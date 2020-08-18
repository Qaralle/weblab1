function trytoparse(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function linecreate(data,i) {
	let line = ""


	line += "<tr>"
	line += "<td>"
	line += data[i][X]
	line += "</td>"
	line += "<td>"
	line += data[i][Y]
	line += "</td>"
	line += "<td>"
	line += data[i][R]
	line += "</td>"
	line += "<td>"
	line += data[i][Result]
	line += "</td>"
	line += "<td>"
	line += data[i][answer_time]
	line += "</td>"
	line += "<td>"
	line += data[i][date_time]
	line += "</td>"
	line += "</tr>"
	return line;
}

function draw_table(data){
	data=JSON.stringify(data)
	let body = $("#table_body").eq(0)
	let line = ""
	if (trytoparse(data) && data != ""){


		for (let i = 0; i <= data.length - 1; i++) {


			line+=linecreate(data,i)


		}
		body.html(line);
	}
}

function update_table(data){

	data=JSON.stringify(data)

	let body = $("#table_body").eq(0)

	let line = ""


	if (trytoparse(data)){

		line=linecreate(data,data.length - 1)
		body.append(line)


		console.log(data.length)

		if (data.length >= 9){
			deleted=data.splice(0,1)

			console.log("i deleted the first element, current length is:"+data.length)
			console.log("deleted element:"+deleted)

			newdata=data.replace("[","")
			newdata=newdata.replace("]","")


			Cookies.set("data", newdata,{path: "/~s283809/test",sameSite:'lax'});
		}

		drawResult(data[data.length-1].X,data[data.length-1].Y,data[data.length-1].R)
	
	}

} 
