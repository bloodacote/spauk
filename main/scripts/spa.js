

// Создаём SPA

// Настройка роутера
Router.setDefaultPage("/pages/main.js");
Router.setNotFoundPage("/pages/404.js");
Router.setMap({
	"/compiler": "/pages/compiler.js",
	"/settings": "/pages/settings.js"
});


// Функция для загрузки контента
async function loadPage(url) {
	toProp("page").setHTML("");
	let link = Router.get(url);

	//console.log(link);

	let pageCode = await loadUrl(link);
	eval(pageCode);
	return true;
}


// При загрузке сайта загружаем ссылку
async function loadSPA() {
	await loadPage(window.location.href);
	return true;
}

loadSPA();