var Views = (function(){
//[]userview
//[]new search 
	var NewSearchView = Backbone.View.extend({
		render : function () {
			var textInput = '<div class="container"><div class="jumbotron"><input id="query" type="text"class="form-control" placeholder="Job title or keyword" aria-describedby="sizing-addon1">'+'<input id="query" type="text"class="form-control" placeholder="Location" aria-describedby="sizing-addon1">';
			var buttonSearch = '<button id="buttonSearch" class="btn btn-default btn-lg">Search</button></div></div>';
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

