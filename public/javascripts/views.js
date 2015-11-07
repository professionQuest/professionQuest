var Views = (function(){

	var NewSearchView = Backbone.View.extend({
		render : function () {
			var queryInput = '<div class="container" class="col-md-3"><input id="query" type="text" class="form-group" placeholder="Job Title" aria-describedby="sizing-addon1" value="javascript">';
			var cityInput = '<input id="city" type="text" class="form-group" placeholder="City or zip code" aria-describedby="sizing-addon1" value="denver, co">';
			var buttonSearch = '<input id="buttonSearch" type="submit" class="form-group"></input></div>';
			var tableJobs = '<div class="container" id="tableTop"><div class="col-sm-3"></div><div class="col-sm-3"></div><div class="col-sm-3"></div><div class="col-sm-3"></div></div>';
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
			var title = '<div class="container"><div class="col-md-15"><a target="_blank" href="' + this.model.get('linkToSource') + '" class="title">' + this.model.get('title') + '</a></div>';
			var company = '<div class="col-md-15" class="company">' + this.model.get('company') + '</div>';
			var convertedDate = new Date(this.model.get('postDate') * 1000);
			var formattedDate =  convertedDate.getMonth() + '/' + convertedDate.getDate() + '/' + convertedDate.getFullYear();
			var date = '<div class="col-md-15" class="date">' + formattedDate + '</div>';
			var location = '<div class="col-md-15" class="location">' + this.model.get('location') + '</div>'
			var addButton = '<button id="addButton" class="submit">save job</button></div>'

			this.$el.html(title + company + date + location + addButton);
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
