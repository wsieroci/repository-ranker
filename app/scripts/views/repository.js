define([
  'handlebars',
  'hbs!tmpl/repository',
  'hbs!tmpl/userListRow',
  'backbone',
  'backbone.marionette'
],
function( Handlebars, repositoryTemplate, userListRowTemplate, Backbone ) {
  'use strict';

  var UserRowView = Backbone.Marionette.ItemView.extend({
    className: 'user-item',
    tagName: 'li',
    template: userListRowTemplate
  });

  var RepositoryView = Backbone.Marionette.CompositeView.extend({
    className: 'repository-view',
    template: repositoryTemplate,
    templateHelpers: function() {
      return { 
        items: this.collection.toJSON() 
      };
    },
    childView: UserRowView,
    childViewContainer: '.user-items'
  });

  return RepositoryView;
});