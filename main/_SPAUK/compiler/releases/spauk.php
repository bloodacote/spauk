<?php
// SPAuk engine (build v1) by bloodacote 
// Compiled time: 2024-02-29 17:52:46 
$root_dir = $_SERVER["DOCUMENT_ROOT"];$method = $_SERVER["REQUEST_METHOD"];$input = file_get_contents("php://input");$input = json_decode($input, true);$output = [];function set_error($code, $text) {http_response_code($code);$error_output = ["code" => $code,"error" => $text];$error_output = json_encode($error_output);echo $error_output;exit();}function check_user_input($key, $type = null, $min = null, $max = null) {global $input;if (!isset($input[$key])) {set_error(418, "no-input__" . $key);}$user_input = $input[$key];if (gettype($user_input) != $type AND $type != null) {set_error(418, "wrong-type__" . $key);}if (gettype($user_input) == "integer") {$input_len = $user_input;}if (gettype($user_input) == "string") {$input_len = mb_strlen($user_input);}if ($input_len < $min AND $min != null) {set_error(418, "too-short__" . $key);}if ($input_len > $max AND $max != null) {set_error(418, "too-long__" . $key);}}function default_user_input($key, $type = null, $default = null, $min = null, $max = null) {global $input;if (!isset($input[$key])) {$input[$key] = $default;}check_user_input($key, $type, $min, $max);}function check_method($need_method) {global $method;if (mb_strtoupper($need_method) != mb_strtoupper($method)) {set_error(418, "wrong-method");}}function get_input($key) {global $input;return $input[$key];}function set_output($key, $val) {global $output;if ($key == null) {$output = $val;} else {$output[$key] = $val;}}function send_output_data() {global $output;$output = json_encode($output);echo $output;}function db_connect($host, $user, $pass, $db_name) {$dsn = "mysql:host=$host;dbname=$db_name";$opts = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,PDO::ATTR_ERRMODE      => PDO::ERRMODE_EXCEPTION];try {$pdo = new PDO($dsn, $user, $pass, $opts);return $pdo;} catch (Exception $err) {set_error(418, "db-fail-connect");}}function db_query($db, $query, $data = []) {$result = $db -> prepare($query);$result -> execute($data);}function db_fetch_one($db, $query, $data = []) {$result = $db -> prepare($query);$result -> execute($data);$data = $result -> fetch();return $data;}function db_fetch_all($db, $query, $data = []) {foreach ($data as $key => $val) {if (gettype($data[$key]) == "integer") {$query = str_replace(":$key", $val, $query);unset($data[$key]);}}$result = $db -> prepare($query);$result -> execute($data);$data = $result -> fetchAll();return $data;}function db_get_last_id($db) {$data = $db -> lastInsertId();return $data;}?>