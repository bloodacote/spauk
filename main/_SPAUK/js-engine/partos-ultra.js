
/* - - - - - - - - - - - - -
	PartOS Ultra
	Модуль для лёгкой работы с DOM-деревом
- - - - - - - - - - - - - */



/* - - - - - - - - - - - - -
	По факту элементы можно инициализировать по трём типам:
	 - Селектор ( button#id.art.menu )
	 - Элемент
	 - Проп (модифицированный элемент) (его как бы нет, но мы его ща сделаем)

	Сначала мы создаём модифицированный элемент (класс).
	Он называется проп (Prop), у него будут упрощённые функции для работы

	ВНИМАНИЕ! У пропа есть функции, которые находятся чуть ниже.
- - - - - - - - - - - - - */

// Модифицированные элементы (пропы)
class PropElement {
	constructor(elem = null) {
		this.element = elem;
	}

	// = = = = = = = = = = = = =
	// Перемещение объектов
	// = = = = = = = = = = = = =

	// Закинуть проп внутрь
	move(place = null) {
		if (place != null) {
			place = toElem(place);
			console.log(place);

			place.appendChild(this.element);
		}
	}

	// Поставить проп перед
	insertBefore(place = null) {
		if (place != null) {
			place = toElem(place);
			place.before(this.element);
		}
	}

	// Поставить проп после
	insertAfter(place = null) {
		if (place != null) {
			place = toElem(place);
			place.after(this.element);
		}
	}

	// = = = = = = = = = = = = =
	// Классы
	// = = = = = = = = = = = = =

	addClass(className) {
		this.element.classList.add(className);
	}

	removeClass(className) {
		this.element.classList.remove(className);
	}

	setClass(classText) {
		if (classText instanceof Array) {
			classText = classText.join(" ");
		}

		this.element.classList.value = classText;
	}

	// = = = = = = = = = = = = =
	// Контент
	// = = = = = = = = = = = = =

	setHTML(content) {
		this.element.innerHTML = content;
	}

	setText(content) {
		this.element.innerText = content;
	}

	setValue(content) {
		this.element.value = content;
	}

	getContent() {
		if (this.element.innerHTML == null) {
			return this.element.value;

		} else {
			return this.element.innerHTML;
		}
	}

}




/* - - - - - - - - - - - - -
	Чтобы перемещаться по этим трём типам и не путаться, сделаем следующее:
	Функция-определитель, которая назовёт тип элемента
	И функции, чтобы преобразовать один тип в другой
- - - - - - - - - - - - - */

// - - - - - - - - - - - - - -
// Функция-определитель
function elemType(elemVar) {
	var result = "other"; // Не определено

	// Если переменная - селектор
	if (typeof elemVar == "string") {
		var elem = document.querySelector(elemVar);

		if (elem != null) { // Проверка на то, есть ли элемент
			result = "selector";
		}
	}

	// Если переменная - элемент
	if (elemVar instanceof Element == true) {
		result = "elem";
	}

	// Если переменная - модифицированный элемент
	if (elemVar instanceof PropElement == true) {
		result = "prop";
	}

	return result;
}


// - - - - - - - - - - - - - -
// Функция превращает в элемент
function toElem(elemVar) {
	var elem = null;
	var type = elemType(elemVar);

	if (type == "selector") {
		elem = document.querySelector(elemVar);
	}
	if (type == "elem") {
		elem = elemVar;
	}
	if (type == "prop") {
		elem = elemVar.element;
	}

	return elem;
}


// - - - - - - - - - - - - - -
// Функция превращает в проп
function toProp(elemVar) {
	var elem = null;
	var type = elemType(elemVar);

	if (type == "selector") {
		var findElem = document.querySelector(elemVar);
		if (findElem != null) {
			elem = new PropElement(findElem);
		}
	}
	if (type == "elem") {
		elem = new PropElement(elemVar);
	}
	if (type == "prop") {
		elem = elemVar;
	}


	return elem;
}




/* - - - - - - - - - - - - -
	Проп любит использовать селекторы, поэтому тут лежат функции для работы с селекторами
- - - - - - - - - - - - - */

// Разбить селектор на данные [СЛОЖНО]
function getSelectorData(selector) {

	// Убираем пробелы
	selector = selector.replaceAll(" ", "");

	var selectorData = {
		type: null,
		id: null,
		classes: []
	};

	// Делим селектор и вытаскиваем тип
	var selectorParts = selector.split("#");

	// Если есть хештег
	if (selectorParts.length != 1) {
		selectorData.type = selectorParts[0];
		var classParts = selectorParts[1].split(".");
		selectorData.id = classParts[0];

	// Если нет хештега
	} else {
		var classParts = selectorParts[0].split(".");
		selectorData.type = classParts[0];
	}

	// Вытаскиваем классы
	for (let i = 1; i < classParts.length; i++) {
		selectorData.classes.push(classParts[i]);
	}

	return selectorData;
}




/* - - - - - - - - - - - - -
	Элементы есть, пропы есть - можно добавить функцию, чтобы их создавать.
- - - - - - - - - - - - - */

// - - - - - - - - - - - - - -
// Функция создать элемент (упрощение)
function addElem(selector = "div", place = null, content = null) {

	// Создание элемента
	var elemData = getSelectorData(selector);

	// Фиксим div по умолчанию
	if (elemData.type == "") {
		elemData.type = "div";
	}

	var elem = document.createElement(elemData.type);

	// Пришиваем айди
	if (elemData.id != null) {
		elem.id = elemData.id;
	}

	// Закидываем сюда классы
	for (let newClass of elemData.classes) {
		elem.classList.add(newClass);
	}

	// Помещаем, если есть куда
	if (place != null) {
		place = toElem(place);
		place.appendChild(elem);
	}

	// Закидываем контент
	if (content != null) {
		elem.innerText = content;
		elem.value = content;
	}

	return elem;
}


// - - - - - - - - - - - - - -
// Функция создать модифицрованный элемент (проп)
function addProp(selector = "div", place = null, content = null) {
	var elem = addElem(selector, place, content);
	var prop = new PropElement(elem);

	return prop;
}