define([
	'controllers/application',
	'backbone',
	'backbone.marionette'
],
function( ApplicationController, Backbone ) {
    'use strict';

	var Router = Marionette.AppRouter.extend({
	  controller: ApplicationController,
	  appRoutes: {
	    '': 'users'
	  }
	});

	return new Router();
})