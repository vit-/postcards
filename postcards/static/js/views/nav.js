var app = window.app || {};

app.NavView = Backbone.View.extend({
	render: function() {
		this.$el.html(this.template());
		return this;
	},
	events: {
		'click .js-collection-tree-update': 'updateTree'
	},
	updateTree: function(e) {
		e.preventDefault();
		app.router.renderCollectionTree();
	},
	selectMenuItem: function(menuItem) {
		this.$('#navbar .nav li').removeClass('active');
		if (menuItem) {
			this.$('#navbar .nav li.' + menuItem).addClass('active');
		}
	}
});
