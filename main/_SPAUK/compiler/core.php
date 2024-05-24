<?php

	// Загружаем настройки
	$root_dir = $_SERVER["DOCUMENT_ROOT"];
	$opt_data = file_get_contents($root_dir . "/_SPAUK/compiler/options.json");
	$opt_data = json_decode($opt_data, true);


	// Упрощение замены regex
	function regex_replace($content, $pattern, $replaced) {

		$content = preg_replace_callback($pattern, function ($match) use ($replaced) {
			//print_r($match);
				if (isset($match['sel'])) {
					return is_callable($replaced) ? $replaced() : $replaced;
			    } else {
			    	return $match[0];
			    }
			},
			$content
		);

		return $content;
	}


	// Функции для обработки кода

	// Функция удаляет комментарии
	function code_remove_comments($text) {
		$text = regex_replace($text, "/(\".*\")|('.*')|(`.*`)|(?<sel>\/\/.*\n)/Us", "");
		$text = regex_replace($text, "/(\".*\")|('.*')|(`.*`)|(?<sel>\/\*.*\*\/)/Us", "");

		return $text;
	}

	// Функция удаляет комментарии
	function code_remove_spaces($text) {
		$text = regex_replace($text, "/(\".*\")|('.*')|(`.*`)|(?<sel>\r\n)/Us", "");
		$text = regex_replace($text, "/(\".*\")|('.*')|(`.*`)|(?<sel>\t)/Us", "");
		$text = regex_replace($text, "/(\".*\")|('.*')|(`.*`)|(?<sel>  )/Us", " ");

		return $text;
	}


	// Функция стирает обрывы PHP
	function code_remove_breaks($text) {
		$text = regex_replace($text, "/(\".*\")|('.*')|(`.*`)|(?<sel>\?><\?php)/Us", "");

		return $text;
	}


	// Функция склеивает текст в один
	function code_clay_files($dir, $files_array) {
		global $root_dir;
		$code = "";

		foreach ($files_array as $file) {
			$code .= file_get_contents($root_dir . $dir . $file);
		}

		return $code;
	}


	// Функция создания метки
	function code_add_stamp($text, $is_php = false) {
		global $opt_data;

		$title = $opt_data["title"];
		$version = $opt_data["version"];
		$author = $opt_data["author"];
		$time = date("Y-m-d H:i:s");

		$stamp = "// $title ($version) by $author \n";
		$stamp .= "// Compiled time: $time \n";

		if ($is_php == true) {
			$stamp = "<?php\n" . $stamp . "?>";
		}

		$text = $stamp . $text;
		return $text;
	}


	// Функция создаёт файлик с контентом по пути
	function write_code_to_file($path, $text) {
		global $root_dir;

		$file = fopen($root_dir . $path, "w");
		fwrite($file, $text);
		fclose($file);
	}

?>