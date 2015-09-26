define([
  'handlebars',
  'hbs!tmpl/user',
  'backbone',
  'backbone.marionette'
],
function( Handlebars, userTemplate, Backbone ) {
  'use strict';

  var UserView = Backbone.Marionette.CompositeView.extend({
    className: 'user-view',
    template: userTemplate,
    templateHelpers: function() {
      return { 
        items: this.collection.toJSON() 
      };
    },
    childView: Backbone.Marionette.ItemView,
    childViewContainer: '.repository-items'
  });

  return UserView;
});