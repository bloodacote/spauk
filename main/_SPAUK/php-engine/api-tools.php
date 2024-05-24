<?php

	/* - - - - - - - - - - - - -
	API Tools
	Модуль для создания REST API
	- - - - - - - - - - - - - */

	$method = $_SERVER["REQUEST_METHOD"];

	// Обработка входных и выходных данных
	$input = file_get_contents("php://input");
	$input = json_decode($input, true);

	$output = [];


	// - - - - - - - - - - - - - -
	// Останавливаем скрипт с ошибкой
	function set_error($code, $text) {
		http_response_code($code);

		// Выдаём ошибку
		$error_output = [
			"code" => $code,
			"error" => $text
		];
		$error_output = json_encode($error_output);
		echo $error_output;

		exit();
	}


	// - - - - - - - - - - - - - -
	// Проверка входных данных
	function check_user_input($key, $type = null, $min = null, $max = null) {
		global $input;

		// Проверка на существование
		if (!isset($input[$key])) {
			set_error(418, "no-input__" . $key);
		}

		$user_input = $input[$key];

		// Проверка на тип данных
		if (gettype($user_input) != $type AND $type != null) {
			set_error(418, "wrong-type__" . $key);
		}

		// Берём длину
		if (gettype($user_input) == "integer") {
			$input_len = $user_input;
		}
		if (gettype($user_input) == "string") {
			$input_len = mb_strlen($user_input);
		}

		// Проверка длины
		if ($input_len < $min AND $min != null) {
			set_error(418, "too-short__" . $key);
		}
		if ($input_len > $max AND $max != null) {
			set_error(418, "too-long__" . $key);
		}
	}


	// - - - - - - - - - - - - - -
	// Проверка входных данных (необязательная)
	function default_user_input($key, $type = null, $default = null, $min = null, $max = null) {
		global $input;

		if (!isset($input[$key])) {
			$input[$key] = $default;
		}

		check_user_input($key, $type, $min, $max);
	}


	// - - - - - - - - - - - - - -
	// Проверка метода
	function check_method($need_method) {
		global $method;

		if (mb_strtoupper($need_method) != mb_strtoupper($method)) {
			set_error(418, "wrong-method");
		}
	}


	// - - - - - - - - - - - - - -
	// Получить данные по ключу
	function get_input($key) {
		global $input;
		return $input[$key];
	}


	// - - - - - - - - - - - - - -
	// Установить выходные данные
	function set_output($key, $val) {
		global $output;

		// Если ключ не указан, то устанавливается весь output
		if ($key == null) {
			$output = $val;

		} else {
			$output[$key] = $val;
		}
	}


	// - - - - - - - - - - - - - -
	// Вывести данные в стиле JSON (REST API)
	function send_output_data() {
		global $output;

		$output = json_encode($output);
		echo $output;
	}

?>