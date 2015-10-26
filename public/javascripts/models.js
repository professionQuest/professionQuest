var Models = (function(){
//[]search result 
//[]search results collection. Make url include variable to replace 'q'.
	var SearchResult = Backbone.Model.extend({

	});

	var SearchResults = Backbone.Collection.extend({
		model : SearchResult,
	
		url : '/request/' + query,
	
		initialize : function() {
			this.fetch();
		} 
	});

	return {
		SearchResult : SearchResult,
		SearchResults : SearchResults
	};
})();

