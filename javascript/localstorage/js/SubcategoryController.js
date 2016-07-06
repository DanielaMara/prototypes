function SubcategoryController() {
    //attributes

    function init() {
        setForm();
        setBtnSave();
        listSubcategories();
    }

    function setForm() {
        var form = document.querySelector('form');

		form.addEventListener('submit', function(event) {
            var id = document.getElementById('input_id').value;

            if(id != '') {
                updateSubcategory(form);
            } else {
                addSubcategory(form);
            }

            clearForm(form);
			event.preventDefault();
		});
    }

    function setBtnSave() {
        var btn_save = document.getElementById('btnSave');

        btn_save.addEventListener('click', function(event) {
            var category = getCategory();
            console.log("categoria: " + JSON.stringify(category));
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
    }

    function clearForm(form) {
        form.subcategory.value = '';
        form.description.value = '';
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
        var item = subcategoryService.getItemById(image.dataset.id)
        document.getElementById('input_id').value = item.id;
        document.getElementById('subcategory').value = item.name;
        document.getElementById('description').value = item.description;
    }

    function updateSubcategory(form) {
        var item = {
            id: form.input_id.value,
			name: form.subcategory.value,
			description: form.description.value
		};

        subcategoryService.update(item);
        //TODO:limpar input hidden
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

    function getCategory() {
        var category,
            category_name = document.getElementById('category').value,
            client = 1,
            subcategories = removeIdFromSubcategories();

        category = {
            name: category_name,
            client: client,
            subcategories: subcategories
        };

        return category;
    }

    function removeIdFromSubcategories() {
        var subcategories = subcategoryService.getList();

        subcategories.forEach(function(subcategory) {
			delete subcategory['id'];
		});

        return subcategories;
    }

    //public methods
    this.init = init;
}

var subcategoryController = new SubcategoryController(),
    subcategoryService = new SubcategoryService();

subcategoryController.init();
