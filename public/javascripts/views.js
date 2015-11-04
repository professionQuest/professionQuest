var Views = (function(){

	var NewSearchView = Backbone.View.extend({
		render : function () {
			var queryInput = '<div class="container"><input id="query" type="text" class="input-group">';
			var cityInput = '<input id="city" type="text" class="input-group">';
			var buttonSearch = '<button id="buttonSearch">Search</button>';
			var tableJobs = '<div class="container" id="tableTop"><div class="col-md-3">Job Title</div><div class="col-md-3">Company</div><div class="col-md-3">Date</div><div class="col-md-3">Location</div></div>';
			this.$el.html(queryInput + cityInput + buttonSearch + tableJobs);

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
			var title = '<div class="container"><div class="col-md-3"><a href="' + this.model.get('linkToSource') + '" class="title">' + this.model.get('title') + '</a></div>';
			var company = '<div class="col-md-3" class="company">' + this.model.get('company') + '</div>';
			var date = '<div class="col-md-3" class="date">' + this.model.get('postDate') + '</div></div>';
			//var link = '<a href="' + this.model.get('detailUrl') + '" target="_blank" class="link">' + this.model.get('detailUrl') + '</a>';

			this.$el.html(title + company + date);
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
