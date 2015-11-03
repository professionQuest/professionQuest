var app = {
	Models : Models,
	Views : Views
};

app.newSearch = new app.Views.NewSearchView();
$('#app').append(app.newSearch.render().$el);
