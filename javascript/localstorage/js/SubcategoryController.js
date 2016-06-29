function SubcategoryController() {
    //attributes

    function init() {
        setForm();
        listSubcategories();
    }

    function setForm() {
        var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			addSubcategory(form);
			clearForm(form);
			event.preventDefault();
		});
    }

    function addSubcategory(form) {
        var subcategory = {
            id: new Date().getTime(), //Generate unique number
			name: form.subcategory.value,
			description: form.description.value
		};

		subcategoryService.add(subcategory);
		addSubcategoryToHTML(subcategory);
        index++;
    }

    function clearForm(form) {
        form.reset();
    }

    function addSubcategoryToHTML(subcategory) {
        var
			table = document.getElementById('tableSubcategory'),
			tr = document.createElement('tr'),
			tdName = createTD(subcategory.name),
			tdDescription = createTD(subcategory.description);
            tdEdit = createTDEdit(subcategory);
            tdDelete = createTDDelete(subcategory);

		tr.appendChild(tdName);
		tr.appendChild(tdDescription);
        tr.appendChild(tdEdit);
        tr.appendChild(tdDelete);

		table.appendChild(tr);
    }

    function createTD(value) {
        var td = document.createElement('td');

		td.innerHTML = value;
		return td;
    }

    function createTDEdit(subcategory) {
        var td = document.createElement('td');
        var imgIcon = createImageIcon('images/edit.png');

        imgIcon.setAttribute('data-id', subcategory.id);
		imgIcon.addEventListener('click', function() {
			editSubcategory(this);
		});

		td.appendChild(imgIcon);

		return td;
    }

    function createTDDelete(subcategory) {
        var td = document.createElement('td');
        var imgIcon = createImageIcon('images/delete.png');

        imgIcon.setAttribute('data-id', subcategory.id);
		imgIcon.addEventListener('click', function() {
			deleteSubcategory(this);
		});

		td.appendChild(imgIcon);

		return td;
    }

    function createImageIcon(location) {
        var imgIcon = document.createElement('img');
		imgIcon.src = location;
		return imgIcon;
    }

    function editSubcategory(image) {
        console.log('Edit: ' + JSON.stringify(image))
    }

    function deleteSubcategory(image) {
        if(subcategoryService.remove(image.dataset.id)) {
			var tr = image.parentNode.parentNode;
			tr.parentNode.removeChild(tr);
		}
    }

    function listSubcategories() {
        var subcategories = subcategoryService.getList();
		subcategories.forEach(function(subcategory) {
			addSubcategoryToHTML(subcategory);
		});
    }

    //public methods
    this.init = init;
}

var subcategoryController = new SubcategoryController(),
    subcategoryService = new SubcategoryService();

subcategoryController.init();
