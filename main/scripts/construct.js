

class SiteConstructor {
	constructor() {

	}

	// Заголовок
	Title(place, text = "") {
		var el = addProp("ui-title", place, text);
		return el;
	}

	// Подзаголовок
	Subtitle(place, text = "") {
		var el = addProp("ui-subtitle", place, text);
		return el;
	}

	// Поле ввода
	Input(place, value = "", placeholder = "") {
		var el = addProp(".ui-input", place);

		let inp = addElem("input", el, value);
		inp.placeholder = placeholder;

		return el;
	}

	// Модифицированное поле ввода
	DecoratedInput(place, icon = "", title = "", value = "", placeholder = "") {
		var el = addProp(".ui-input", place);

		let deco = addProp(".ui-input-deco", el);
		deco.setHTML(`<img src="/icons/${icon}.svg"> <text>${title}</text>`);

		let inp = addElem("input", el, value);
		inp.placeholder = placeholder;

		el.set = function(text) {
			inp.value = text;
		}

		return el;
	}

	// Кнопка
	Button(place, text = "", func = null) {
		var el = addProp("ui-button", place, text);
		el.element.onclick = func;
		return el;
	}
}

const construct = new SiteConstructor();