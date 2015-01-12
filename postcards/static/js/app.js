var app = window.app || {};
app = $.extend(app, {
	views: {},
	models: {},
	loadTemplates: function(views, callback) {
		var deffereds = [];

		$.each(views, function(index, view) {
			if (app[view]) {
				deffereds.push($.get(app.config.staticUrl + 'tpl/' + view + '.html', function(data) {
					app[view].prototype.template = _.template(data);
				}, 'html'));
			}
			else {
				console.log('ERROR: view ' + view + ' now found.');
			}
		});

		$.when.apply(null, deffereds).done(callback);
	}
});

app.Router = Backbone.Router.extend({
	routes: {
		'': 'index',
		'collection/*ids': 'postcard'
	},
	initialize: function() {
		app.navView = new app.NavView();
		$('body').html(app.navView.render().el);
		this.$collectionTree = $('.collection-tree');
		this.$postcard = $('.postcard');

		this.renderCollectionTree();
	},
	renderCollectionTree: function() {
		if (!app.collectionCollection) {
			app.collectionCollection = new app.CollectionCollection();
		}
		if (!app.collectionListView) {
			app.collectionListView = new app.CollectionListView({model: app.collectionCollection});
		}
		var that = this;
		app.collectionCollection.fetch({
			success: function() {
				that.$collectionTree.html(app.collectionListView.render().el);
			}
		});
	},
	index: function() {
		console.log('ROUTER: index');
		app.navView.selectMenuItem();
	},
	postcard: function(ids) {
		console.log('ROUTER: postcard ids ' + ids);
		if (!app.postcardCollection) {
			app.postcardCollection = new app.PostcardCollection();
		}
		if (!app.postcardListView) {
			app.postcardListView = new app.PostcardListView({model: app.postcardCollection});
		}
		var that = this;
		app.postcardCollection.requestParams.collections = ids;
		app.postcardCollection.fetch({
			success: function() {
				that.$postcard.html(app.postcardListView.render().el);
			}
		});
	}
});

$(document).ready(function() {
	function csrfSafeMethod(method) {
	    // these HTTP methods do not require CSRF protection
	    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	var csrftoken = $.cookie('csrftoken');
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});

	app.loadTemplates(
		['NavView', 'CollectionListItemView', 'PostcardListItemView'],
		function() {
			app.router = new app.Router();
			Backbone.history.start();
		});
});
