var Views = (function(){
//[]userview
//[]new search 
	var NewSearchView = Backbone.View.extend({
		render : function () {
			var textInput = '<input id="query" type="text">';
			var buttonSearch = '<button id="buttonSearch">Search</button>';
			this.$el.html(textInput + buttonSearch);

			return this;
		},
		events : {
			'#buttonSearch click' : 'displayResults'
		},
		displayResults : function () {
			//create a new search collection
			//create a new search collection view (with 'q' for whatever is in the input)

			var query = $('#query').val();
			var searchResults = new app.Models.SearchResults(); 
			//create new search results view and append to document
		}
	});

	var SearchResultsView = Backbone.View.extend({
		render : function () {
			//[] loop through the collection and 
				//[] create individual search result views
			return this;
		},
	})

	return {
		NewSearchView : NewSearchView
	};
})();

