define([
  'communicator',
  'backbone',
  'backbone.marionette'
],
function( communicator, Backbone ) {
  'use strict';

  var OrgRepositoryCollection = Backbone.Collection.extend({
    initialize: function (model, options) {
      this.url = 'https://api.github.com/orgs/angular/repos?client_id=7afd6b8573c9b0fadc21&client_secret=74e744a109e702226c7232aa6d1493c9fead4018';
    },
    model: function (attributes, options) {
      return new Backbone.Model(attributes, options);
    }
  });

  communicator.reqres.setHandler("collection:getOrgRepositories", function () {
    var collection = new OrgRepositoryCollection();
    return collection.fetch().then(function () {
      return collection;
    });
  });

  return OrgRepositoryCollection;
});