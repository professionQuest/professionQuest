var app = {
	Models : Models,
	Views : Views
};

app.Router = Backbone.Router.extend({
  routes: {
    '': 'search',
		'saved-jobs': 'savedJobs'
  }
});

// initialize the the router
app.router = new app.Router;

app.router.on('route:search', function() {
	if (app.jobsView) {
		app.jobsView.remove();
	}
	if (app.searchResultsView) {
		app.searchResultsView.remove();
	}
	app.newSearchView = new app.Views.NewSearchView();
	$('#app').append(app.newSearchView.render().$el);
});

app.router.on('route:savedJobs', function() {
	if (app.newSearchView) {
		app.newSearchView.remove();
	}
	if (app.searchResultsView) {
		app.searchResultsView.remove();
	}
	app.jobs = new app.Models.Jobs( null, { userId: $('#user-id').val() });
	app.jobsView = new app.Views.JobsView({ collection: app.jobs });
	$('#app').append(app.jobsView.render().$el);
});

// start Backbone history for forward and backward navigation
Backbone.history.start();
