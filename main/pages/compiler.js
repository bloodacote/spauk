

// Установка
construct.Title("page", "Компилятор");
construct.Subtitle("page", "Здесь можно компилировать");

var elemBuildVersion = construct.DecoratedInput("page", "cube", "Версия сборки", "", "Пример: build v1");

construct.Button("page", "Компилировать JS-сборку");
construct.Button("page", "Компилировать PHP-сборку");


// Получить инфу и выставить её
async function load() {
	var buildData = await loadJSON("/_SPAUK/compiler/options.json");
	console.log(buildData);

	elemBuildVersion.set(buildData.version);
}

load();