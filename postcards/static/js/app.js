$(document).ready(function() {
	app = {};

	app.CollectionModel = Backbone.Model.extend();
	app.CollectionList = Backbone.Collection.extend({
		model: app.CollectionModel,
		url: Urls['collection-list'],
		initialize: function() {
			console.log('Initializing CollectionList');
			this.fetch();
		}
	});

	app.collectionList = new app.CollectionList();

	app.CollectionView = Backbone.View.extend({
		tagName: 'div',
		template: _.template($('.js-template-collection').html()),
		render: function() {
			var data = this.model.toJSON();
			console.log('data: ' + JSON.stringify(data));
			this.$el.html(this.template(data));
			return this;
		}
	});

	app.AppView = Backbone.View.extend({
		el: '#container',
		initialize: function() {
			app.collectionList.on('add', this.addOne, this);
		},
		events: {
			'submit .collection-form': 'addCollection'
		},
		addOne: function(collection) {
			var view = new app.CollectionView({model: collection});
			this.$el.append(view.render().el);
			return this;
		},
		renderForm: function() {
			this.$el.append('<form class="collection-form"> <input name="name" placeholder="name" /> <input name="parent" placeholder="parent" /> <input type="submit" /> </form>');
		},
		clear: function() {
			this.$el.html('');
			this.renderForm();
			return this;
		},
		render: function() {
			console.log('rendering');
			this.clear();
			app.collectionList.fetch();
			app.collectionList.each(this.addOne, this);
			return this;
		},
		addCollection: function(e) {
			e.preventDefault();
			var data = {};
			$(e.target).serializeArray().map(function(x) {
				data[x.name] = x.value;
			});
			console.log('addCollection: '+ JSON.stringify(data));
			app.collectionList.create(data, {wait: true});
			return this;
		}
	});

	app.appView = new app.AppView();

	app.Router = Backbone.Router.extend({
		routes: {
			'': 'index',
			'collection': 'index',
		},
		index: function() {
			app.appView.render();
		}
	});

	app.router = new app.Router();
	Backbone.history.start();

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
});
