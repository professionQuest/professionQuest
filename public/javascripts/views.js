var Views = (function() {

	var NewSearchView = Backbone.View.extend({
		render : function() {
			var queryInput = '<div class="container" class="col-md-3"><input id="query" type="text" class="form-group" placeholder="Job Title" aria-describedby="sizing-addon1">';
			var cityInput = '<input id="city" type="text" class="form-group" placeholder="Enter zip code" aria-describedby="sizing-addon1">';
			var buttonSearch = '<input id="buttonSearch" type="submit" class="form-group"></input></div>';
			var tableJobs = '<div class="container" id="tableTop"><div class="col-sm-3"></div><div class="col-sm-3"></div><div class="col-sm-3"></div><div class="col-sm-3"></div></div>';
			this.$el.html(queryInput + cityInput + buttonSearch + tableJobs);

			return this;
		},
		events : {
			'click #buttonSearch' : 'displayResults'
		},
		displayResults : function() {
			app.searchResults = new app.Models.SearchResults(null, { query: $('#query').val(), city: $('#city').val() });
			if (app.searchResultsView) {
				app.searchResultsView.remove();
			}
			if (app.jobsView) {
				app.jobsView.remove();
			}
			app.searchResultsView = new SearchResultsView({ collection: app.searchResults });
			$('#app').append(app.searchResultsView.render().$el);
		}
	});

	var SearchResultView = Backbone.View.extend({
		className : 'search-result',
		render : function() {
			var title = '<div class="container"><div class="col-md-15"><a target="_blank" href="' + this.model.get('linkToSource') + '" class="title">' + this.model.get('title') + '</a></div>';
			var company = '<div class="col-md-15" class="company">' + this.model.get('company') + '</div>';
			var convertedDate = new Date(this.model.get('postDate') * 1000);
			var formattedDate =  (convertedDate.getMonth() + 1) + '/' + (convertedDate.getDate() + 1) + '/' + convertedDate.getFullYear();
			var date = '<div class="col-md-15" class="date">' + formattedDate + '</div>';
			var location = '<div class="col-md-15" class="location">' + this.model.get('location') + '</div>'
			var addButton = '<button class="saveButton submit">Save Job</button></div>'

			this.$el.html(title + company + date + location + addButton);
			return this;
		},
		events: {
			'click .saveButton': 'saveJob'
		},
		saveJob: function() {
			$.ajax({
				method: 'POST',
				url: '/users/' + $('#user-id').val() + '/jobs/new',
				data: {
					title: this.model.get('title'),
					linkToSource: this.model.get('linkToSource'),
					company: this.model.get('company'),
					postDate: this.model.get('postDate'),
					location: this.model.get('location'),
				}
			});
			this.model.destroy();
			this.remove();
		}
	});

	var SearchResultsView = Backbone.View.extend({
		id : 'search-results',
		render : function() {
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

	var JobView = Backbone.View.extend({
		className : 'saved-result',
		render : function() {
			var title = '<div class="container" class"trying"><div class="col-md-15"><a target="_blank" href="' + this.model.get('linkToSource') + '" class="title">' + this.model.get('title') + '</a></div>';
			var company = '<div class="col-md-15" class="company">' + this.model.get('company') + '</div>';
			var convertedDate = new Date(this.model.get('postDate') * 1000);
			var formattedDate =  (convertedDate.getMonth() + 1) + '/' + (convertedDate.getDate() + 1) + '/' + convertedDate.getFullYear();
			var date = '<div class="col-md-15" class="date">' + formattedDate + '</div>';
			var location = '<div class="col-md-15" class="location">' + this.model.get('location') + '</div>'
			var deleteButton = '<button class="deleteButton">Delete</div></div>'

			this.$el.html(title + company + date + location + deleteButton);
			return this;
		},
		events: {
			'click .deleteButton': 'deleteJob'
		},
		deleteJob: function() {
			this.model.destroy();
			this.remove();
		}
	});

	var JobsView = Backbone.View.extend({
		render : function() {
			this.$el.html('<h2 class="savedJob">Saved Jobs</h2>');
			this.collection.each(function(model) {
				var result = new JobView({ model: model });
				this.$el.append(result.render().$el);
			}, this);

			return this;
		},
		initialize : function() {
			this.listenTo(this.collection, 'update', this.render);
		}
	});

	return {
		NewSearchView: NewSearchView,
		SearchResultView: SearchResultView,
		SearchResultsView: SearchResultsView,
		JobView: JobView,
		JobsView: JobsView
	};
})();
