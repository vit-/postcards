var app = window.app || {};

app.PostcardListView = Backbone.View.extend({
	tagName: 'ul',
	initialize: function() {
		this.model.on('reset', this.render, this);
		this.model.on('add', this.appendPostcard, this);
	},
	appendPostcard: function(postcard) {
		this.$el.append(new app.PostcardListItemView({model: postcard}).render().el);
		return this;
	},
	render: function() {
		this.$el.empty();
		_.each(this.model.models, this.appendPostcard, this);
		return this;
	}
});

app.PostcardListItemView = Backbone.View.extend({
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
