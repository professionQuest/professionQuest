var Views = (function(){

	var NewSearchView = Backbone.View.extend({
		render : function () {
			var queryInput = '<input id="query" type="text">';
			var cityInput = '<input id="city" type="text">';
			var buttonSearch = '<button id="buttonSearch">Search</button>';
			this.$el.html(queryInput + cityInput + buttonSearch);

			return this;
		},
		events : {
			'click #buttonSearch' : 'displayResults'
		},
		displayResults : function () {
			app.searchResults = new app.Models.SearchResults(null, { query: $('#query').val(), city: $('#city').val() });
			if (app.searchResultsView) {
				app.searchResultsView.remove();
			}
			app.searchResultsView = new SearchResultsView({ collection: app.searchResults });
			$('#app').append(app.searchResultsView.render().$el);
		}
	});

	var SearchResultView = Backbone.View.extend({
		className : 'search-result',
		render : function () {
			var title = '<span class="title">' + this.model.get('jobTitle') + '</span>';
			var company = '<span class="company">' + this.model.get('company') + '</span>';
			var date = '<span class="date">' + this.model.get('date') + '</span>';
			var link = '<a href="' + this.model.get('detailUrl') + '" target="_blank" class="link">' + this.model.get('detailUrl') + '</a>';

			this.$el.html(title + company + date + link);
			return this;
		}
	});

	var SearchResultsView = Backbone.View.extend({
		id : 'search-results',
		render : function () {
			this.$el.html('');
			this.collection.each(function(model) {
				var result = new SearchResultView({ model: model });
				this.$el.append(result.render().$el);
			}, this);

			return this;
		},
		initialize : function() {
			this.listenTo(this.collection, 'update', this.render);
		}
	});

	return {
		NewSearchView : NewSearchView,
		SearchResultView : SearchResultView,
		SearchResultsView : SearchResultsView
	};
})();
