define([
  'models/user',
  'gh3',
  'jquery',
  'communicator',
  'backbone',
  'backbone.marionette'
],
function( UserModel, Gh3, $, communicator, Backbone ) {
  'use strict';

  var MAX_REQUESTS_NUMBER = 2;

  var UserRepositoryCollection = Backbone.Collection.extend({
    initialize: function (options) {
      this._repositoryName = options.repository.get('full_name');
      this.url = 'https://api.github.com/repos/' + this._repositoryName + '/stats/contributors?client_id=7afd6b8573c9b0fadc21&client_secret=74e744a109e702226c7232aa6d1493c9fead4018';
    },
    model: function (attributes, options) {
      return new UserModel(attributes, options);
    }
  });

  function getUserRepositories() {
    var repositories = communicator.reqres.request('collection:getOrgRepositories');
    var userRepositories = [];
    var deferred = $.Deferred();
    var numRequests = 0;

    repositories.then(function (repositories) { 
      repositories.each(function (model) {
        var userRepositoryCollection = new UserRepositoryCollection({repository: model});
        if(numRequests > MAX_REQUESTS_NUMBER - 1) {
          return false; 
        }
        userRepositories.push(userRepositoryCollection.fetch().then(function () {
          return userRepositoryCollection;
        }));

        numRequests++;
      });

      deferred.resolve(userRepositories);
    });

    return deferred.promise();
  }

  communicator.reqres.setHandler("collection:getUsers", function () {
    var deferred = $.Deferred();

    getUserRepositories().then(function (userRepositories) {
      $.when.apply(this, userRepositories).done(function () {
        var collection = Array.prototype.slice.call(arguments);
        
      });
    });

    return deferred.promise();
  });

  return UserRepositoryCollection;
});