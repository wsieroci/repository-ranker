define([
  'handlebars',
  'hbs!tmpl/welcome',
  'backbone',
  'backbone.marionette'
],
function( Handlebars, welcomeTemplate, Backbone ) {
  'use strict';

  var UsersView = Backbone.Marionette.ItemView.extend({
    className: 'content',
    template: welcomeTemplate,
    model: new Backbone.Model({success: "Steve"})
  });

  return UsersView;
})