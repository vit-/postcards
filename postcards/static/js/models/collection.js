var app = window.app || {};

app.CollectionModel = Backbone.Model.extend({
	urlRoot: Urls['collection-list']
});

app.CollectionCollection = Backbone.Collection.extend({
	model: app.CollectionModel,
	url: Urls['collection-list']
});
