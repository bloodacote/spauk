

/* - - - - - - - - - - - - -
	Router
	Модуль для красивых ссылочек
- - - - - - - - - - - - - */



class SpaukRouter {
	constructor(pageMap = {"/": "/index.html"}, defaultPage = "/", notFoundPage = "/404.html") {
		this.pageMap = pageMap;

		this.defaultPage = defaultPage;
		this.notFoundPage = notFoundPage;
	}

	// Функция получения ссылки
	get(link = "/") {
		let page = this.notFoundPage;

		// Преобразуем ссылку
		link = link.split("?");
		link = link[0];
		link += "/";

		// Корневая ссылка
		if (link == "//" || link == "/") {
			page = this.defaultPage;

		// Поиск по карте нужной ссылки
		} else {
			for (let [mapLink, mapPage] of Object.entries(this.pageMap)) {
				if (link.startsWith(mapLink + "/")) {
					page = mapPage;
				}
			}
		}

		return page;
	}

	// Редирект
	set(link = "/") {
		window.location.href = link;
	}

	// Функция редиректа
	goto(link = "/") {
		window.history.pushState(link, "", link);
	}

	// Функция возвращает ссылку обратно
	back(isReload = false) {
		window.history.back();

		// Если back(true), то также работает редирект
		if (isReload == true) {
			window.location.href = window.location.href;
		}
	}

	// = = = = = = = = = = = = =
	// Работа с данными
	// = = = = = = = = = = = = =
	setMap(pageMap) {
		if (typeof(pageMap) == "object") {
			this.pageMap = pageMap;
		}
	}

	setDefaultPage(defaultPage) {
		this.defaultPage = defaultPage;
	}

	setNotFoundPage(notFoundPage) {
		this.notFoundPage = notFoundPage;
	}
}


const Router = new SpaukRouter();