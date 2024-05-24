<?php

	// Подключение ядра
	require $_SERVER["DOCUMENT_ROOT"] . "/_SPAUK/compiler/core.php";

	// Скеливаем файлы в один
	$lib_code = "";
	$lib_code = code_clay_files($opt_data["php_dir"], $opt_data["php_files"]);

	// Убираем лишнее из кода
	$lib_code = code_remove_comments($lib_code);
	$lib_code = code_remove_spaces($lib_code);
	$lib_code = code_add_stamp($lib_code, true);
	$lib_code = code_remove_breaks($lib_code);

	// Добавляем метку и загружаем
	echo nl2br($lib_code);

	// Закидываем в файлик
	write_code_to_file($opt_data["php_compiled_path"], $lib_code);

?>