function SubcategoryService() {
    //attributes
    var list = [];

    function getList() {
        getFromLocalStorage();
		return list;
    }

    function add(subcategory) {
        list.push(subcategory);
		saveToLocalStorage();
    }

    function getFromLocalStorage() {
        var jsonText = window.localStorage.getItem('subcategory-list');
		if(jsonText) {
			list = JSON.parse(jsonText);
		}
    }

    function saveToLocalStorage() {
        var jsonText = JSON.stringify(list);
		window.localStorage.setItem('subcategory-list', jsonText);
    }

    function remove(id) {
        var index = findIndex(id);
		if(index !== null && confirm("Do you want to remove?")) {
			list.splice(index, 1);
			saveToLocalStorage();
			return true;
		}
		return false;
    }

    function findIndex(id) {
		var
			lista = list,
			indexFound = null;

		lista.some(function(subcategory, index){
			if(id == subcategory.id) {
				indexFound = index;
				return true;
			}
		});

        return indexFound;
    }

    function getItemById(id) {
		var
			lista = list,
			item = null;

		lista.some(function(subcategory, index){
			if(id == subcategory.id) {
                item = {
                    id: subcategory.id,
        			name: subcategory.name,
        			description: subcategory.description
        		};
				return true;
			}
		});

        return item;
    }

    function update(item) {
		list.some(function(subcategory, index){
			if(item.id == subcategory.id) {
                subcategory.id = item.id,
        		subcategory.name = item.name,
        		subcategory.description = item.description
				return true;
			}
		});

        saveToLocalStorage(list);
    }

    //public methods
    this.add = add
    this.getList = getList
    this.remove = remove
    this.getItemById = getItemById
    this.update = update
}
