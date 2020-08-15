<?php
$start_time = microtime();

$X = $_POST['X'];
$Y = $_POST['Y'];
$R = $_POST['R'];

$optionsY = array(
    'options' => array(	
        'min_range' => -4,
        'max_range' => 4,
    )
);

$R_value=array(1,1.5,2,2.5,3);


if (filter_var($X, FILTER_VALIDATE_FLOAT) !== false and
	filter_var($Y, FILTER_VALIDATE_INT, $optionsY) !== false and
	filter_var($R, FILTER_VALIDATE_FLOAT) !== false and 
	$X >= -5 and $X <= 5 and
	in_array($R, $R_value)){




	if($X<0 and $Y<0){
		$result=false;
	}elseif ($X>=0 and $Y<=0 and $X<= $R and $Y>= -$R) {
		$result=true;
	}elseif ($X>=0  and $Y>=0 and ($X**2+$Y**2<= (($R)/2)**2)){
		$result=true;
	}elseif ($X<=0 and $Y >=0 and ($Y-$X)<=$R/2){
		$result=true;
	}else{
		$result=false;
	}

	



	$date_time= date('Y-m-d H:i:s');
	$answer_time =  microtime() - $start_time;

	
	$answer="{\"X\": \"$X\", \"Y\":$Y, \"R\":$R,\"Result\": ";
	$answer .= $result ? 'true': 'false';
	$answer .= ",\"answer_time\": \"$answer_time\", \"date_time\": \"$date_time\"}";




	if (isset($_COOKIE["data"]))   
	{   
	    $answer=($_COOKIE["data"] . "," . $answer);
	}	

	header('Set-Cookie: data='.$answer."; samesite=lax");
	echo true;

} else {
	echo false;
}

?>
