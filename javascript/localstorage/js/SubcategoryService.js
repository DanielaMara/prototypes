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

    //public methods
    this.add = add
    this.getList = getList
    this.remove = remove
}
