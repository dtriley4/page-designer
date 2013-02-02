define([
       'jquery',
       'underscore',
       'backbone',

], function($, _, Backbone){
	var AppRouter = Backbone.Router.extend({

		routes: {
			''             : 'index',
		},

		index: function(){
		},


	});

	var initialize = function() {
		var router = new AppRouter();
		Backbone.history.start();
	}

	return {
		initialize: initialize
	};

});

