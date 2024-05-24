<?php

	require $_SERVER["DOCUMENT_ROOT"] . "/_SPAUK/compiler/releases/spauk.php";

	$num = rand();

	$db = db_connect("127.0.0.1", "root", "", "testdb");

	db_query($db, "INSERT INTO users (nick, status) VALUES ('dick', 'anus')");

	$db_data = db_fetch_all($db, "SELECT * FROM users WHERE nick = 'dick' LIMIT :count", [
		"count" => 5
	]);


	//$db_data = db_get_last_id($db);

	//check_method("post");

	default_user_input("name", "string", "milk", 3, 8);
	//check_user_input("name", "string", 3, 8);

	$test = get_input("name");

	set_output("db", $db_data);
	set_output("method", $method);
	set_output("name", $test);

	send_output_data();

?>