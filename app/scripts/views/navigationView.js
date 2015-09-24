define([
  'handlebars',
  'hbs!tmpl/navigation',
  'backbone',
  'backbone.marionette'
],
function( Handlebars, navigationTemplate, Backbone ) {
  'use strict';

  var NavigationView = Backbone.Marionette.ItemView.extend({
    className: 'navigation',
    template: navigationTemplate
  });

  return NavigationView;
});