var app = {
	Models : Models,
	Views : Views
};

var newSearch = new app.Views.NewSearchView();
$('#app').append(newSearch.render().$el);