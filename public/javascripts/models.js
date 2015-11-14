var Models = (function(){
	var SearchResult = Backbone.Model.extend({

	});

	var SearchResults = Backbone.Collection.extend({
		model : SearchResult,

		initialize : function(models, options) {
			this.url = '/request/' + options.query + '/' + options.city;
			this.fetch();
		}
	});

	var Job = Backbone.Model.extend({
		idAttribute: '_id'
	});

	var Jobs = Backbone.Collection.extend({
		model : Job,

		initialize : function(models, options) {
			this.url = '/users/' + options.userId + '/jobs';
			this.fetch();
		}
	});

	return {
		SearchResult: SearchResult,
		SearchResults: SearchResults,
		Job: Job,
		Jobs: Jobs
	};
})();
