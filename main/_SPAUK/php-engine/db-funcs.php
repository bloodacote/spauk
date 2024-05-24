<?php

	// Функция подключает БД через PDO
	function db_connect($host, $user, $pass, $db_name) {
		$dsn = "mysql:host=$host;dbname=$db_name";
		$opts = [
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION
		];

		try {
			$pdo = new PDO($dsn, $user, $pass, $opts);
			return $pdo;

		} catch (Exception $err) {
			set_error(418, "db-fail-connect");
		}
	}


	// Функция выполняет запрос в MySQL
	function db_query($db, $query, $data = []) {
		$result = $db -> prepare($query);
		$result -> execute($data);
	}


	// Функция берёт у БД строчку
	function db_fetch_one($db, $query, $data = []) {
		$result = $db -> prepare($query);
		$result -> execute($data);

		$data = $result -> fetch();
		return $data;
	}


	// Функция берёт у БД список строчек
	function db_fetch_all($db, $query, $data = []) {

		// Фиксим числа в запросе
		foreach ($data as $key => $val) {
			if (gettype($data[$key]) == "integer") {
				$query = str_replace(":$key", $val, $query);
				unset($data[$key]);
			}
		}

		// Идём дальше
		$result = $db -> prepare($query);
		$result -> execute($data);

		$data = $result -> fetchAll();
		return $data;
	}


	// Функция возвращает айди последнего созданного объекта
	function db_get_last_id($db) {
		$data = $db -> lastInsertId();
		return $data;
	}


?>