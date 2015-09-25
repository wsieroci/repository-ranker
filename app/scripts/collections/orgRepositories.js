define([
  'communicator',
  'models/repository',
  'jquery',
  'backbone',
  'backbone.marionette'
],
function( communicator, RepositoryModel, $, Backbone ) {
  'use strict';

  var ORGANIZATION_API = 'https://api.github.com/orgs/angular/repos?client_id=7afd6b8573c9b0fadc21&client_secret=74e744a109e702226c7232aa6d1493c9fead4018';

  var OrgRepositoryCollection = Backbone.Collection.extend({
    initialize: function (model, options) {
      this.url = ORGANIZATION_API;
    },
    model: function (attributes, options) {
      var repository = new RepositoryModel(attributes, options);
      return repository;
    }
  });

  var collection;

  communicator.reqres.setHandler("collection:getOrgRepositories", function () {
    if(!collection) {
      collection = new OrgRepositoryCollection();
      return collection.fetch().then(function () {
        return collection;
      });
    } else {
      var deferred = $.Deferred();
      deferred.resolve(collection);
      return deferred.promise();
    }
  });

  return OrgRepositoryCollection;
});