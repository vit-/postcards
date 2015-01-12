var app = window.app || {};

app.PostcardModel = Backbone.Model.extend({
	urlRoot: Urls['postcard-list']
});

app.PostcardCollection = Backbone.Collection.extend({
	model: app.PostcardModel,
	requestParams: {},
	url: function() {
		var url = new Url(Urls['postcard-list']());
		url.query = $.param(this.requestParams);
		return url;
	},
});
