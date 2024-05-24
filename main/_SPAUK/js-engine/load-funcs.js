
/* - - - - - - - - - - - - -
	Load Funcs
	Модуль, у которого будет несколько функций для загрузки API и файлов
- - - - - - - - - - - - - */


// - - - - - - - - - - - - - - -
// Функция для загрузки API
async function loadUrl(url, method = "GET", data = {}) {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url, false);

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				resolve(xhr.responseText);
			}
		};

		xhr.send(JSON.stringify(data));
	});
}


// - - - - - - - - - - - - - - -
// Функция для загрузки REST API
async function loadApi(url, method = "GET", data = {}) {
	var result = await loadUrl(url, method, data);
	return JSON.parse(result);
}


// - - - - - - - - - - - - - - -
// Функция для загрузки JSON
async function loadJSON(url) {
	var result = await loadUrl(url, "get", {});
	return JSON.parse(result);
}