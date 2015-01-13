var app = window.app || {};

app.NavView = Backbone.View.extend({
	render: function() {
		this.$el.html(this.template());
		return this;
	},
	events: {
		'click .js-collection-tree-update': 'updateTree',
		'click .js-collection-tree-add': 'showAddForm',
	},
	updateTree: function(e) {
		e.preventDefault();
		app.router.renderCollectionTree();
		return false;
	},
	showAddForm: function(e) {
		e.preventDefault();
		var that = this;
		var form = new app.CollectionForm({model: new app.CollectionModel()});
		this.$('.js-collection-form').html(form.render().el);
		return false;
	},
	selectMenuItem: function(menuItem) {
		this.$('#navbar .nav li').removeClass('active');
		if (menuItem) {
			this.$('#navbar .nav li.' + menuItem).addClass('active');
		}
	}
});

app.CollectionForm = Backform.Form.extend({
	fields: [{
		name: 'name',
		placeholder: 'Name',
		control: 'input',
		required: true
	}, {
		name: 'parent',
		placeholder: 'Parent ID',
		control: 'input'
	}, {
		control: 'button',
		label: 'Add',
		extraClasses: ['btn-primary']
	}, {
		control: 'button',
		type: 'button',
		label: 'Cancel',
		extraClasses: ['btn-cancel']
	}],
	events: {
		'submit': function(e) {
			if (e) e.preventDefault();
			var that = this;
			this.model.save().done(function(result) {
				that.remove();
				app.router.renderCollectionTree();
			}).fail(function(result) {
				console.log('COLLECTION FORM: Adding failed. ' + result);
				alert('Saving failed.');
			});
			return false;
		},
		'click .btn-cancel': function() {
			this.remove();
		}
	}
});
