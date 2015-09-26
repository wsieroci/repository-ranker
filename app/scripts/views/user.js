define([
  'handlebars',
  'hbs!tmpl/user',
  'hbs!tmpl/repositoryRow',
  'backbone',
  'backbone.marionette'
],
function( Handlebars, userTemplate, repositoryRowTemplate, Backbone ) {
  'use strict';

  var RepositoryRowView = Backbone.Marionette.ItemView.extend({
    className: 'repository-item',
    tagName: 'li',
    template: repositoryRowTemplate
  });

  var UserView = Backbone.Marionette.CompositeView.extend({
    className: 'user-view',
    template: userTemplate,
    templateHelpers: function() {
      return { 
        items: this.collection.toJSON() 
      };
    },
    childView: RepositoryRowView,
    childViewContainer: '.repository-items'
  });

  return UserView;
});