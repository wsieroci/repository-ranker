define([
  'handlebars',
  'hbs!tmpl/loading',
  'backbone',
  'backbone.marionette'
],
function( Handlebars, loadingTemplate, Backbone ) {
  'use strict';

  var LoadingView = Backbone.Marionette.ItemView.extend({
    className: 'loading',
    template: loadingTemplate
  });

  return LoadingView;
});