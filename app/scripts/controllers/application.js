define([
	'backbone',
	'backbone.marionette'
],
function( Backbone ) {
    'use strict';

	var ApplicationController = Backbone.Marionette.Controller.extend({
	  users: function () {
	  }
	});

	return new ApplicationController();
});