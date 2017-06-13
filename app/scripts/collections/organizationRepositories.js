define([
  'communicator',
  'models/repository',
  'jquery',
  'backbone'
],
function( communicator, RepositoryModel, $, Backbone ) {
  'use strict';

  var ORGANIZATION_API = 'https://api.github.com/orgs/angular/repos?<%= credentials %>';

  var OrganizationRepositoryCollection = Backbone.Collection.extend({
    initialize: function (model, options) {
      this.url = _.template(ORGANIZATION_API)({
        credentials: communicator.reqres.request('options:getCredentials')
      });
    },
    model: function (attributes, options) {
      var repository = new RepositoryModel(attributes, options);
      return repository;
    }
  });

  var collection;

  communicator.reqres.setHandler("collection:getOrganizationRepositories", function () {
    if(!collection) {
      collection = new OrganizationRepositoryCollection();
      return collection.fetch().then(function () {
        return collection;
      });
    } else {
      var deferred = $.Deferred();
      deferred.resolve(collection);
      return deferred.promise();
    }
  });

  return OrganizationRepositoryCollection;
});