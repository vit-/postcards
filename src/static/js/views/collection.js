var app = window.app || {};

app.CollectionListView = Backbone.View.extend({
	tagName: 'ul',
	initialize: function() {
		this.model.on('reset', this.render, this);
		this.model.on('add', this.appendCollection, this);
	},
	appendCollection: function(collection) {
		this.$el.append(new app.CollectionListItemView({model: collection}).render().el);
		return this;
	},
	render: function() {
		this.$el.empty();
		_.each(this.model.models, this.appendCollection, this);
		return this;
	}
});

app.CollectionListItemView = Backbone.View.extend({
	tagName: 'li',
	initialize: function() {
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.close, this);
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
