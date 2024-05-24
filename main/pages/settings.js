

// Установка
construct.Title("page", "Настройки");
construct.Subtitle("page", "Настройка компилятора");

var elemBuildVersion = construct.DecoratedInput("page", "cube", "Версия сборки", "", "Пример: build v1");

construct.Button("page", "Сохранить настройки");
construct.Button("page", "Вернуть предыдущие");


// Получить инфу и выставить её
async function load() {
	var buildData = await loadJSON("/_SPAUK/compiler/options.json");
	console.log(buildData);

	elemBuildVersion.set(buildData.version);
}

load();