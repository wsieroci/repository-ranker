define([
  'models/user',
  'models/repository',
  'gh3',
  'jquery',
  'communicator',
  'backbone',
  'backbone.marionette'
],
function( UserModel, RepositoryModel, Gh3, $, communicator, Backbone ) {
  'use strict';

  var MAX_REQUESTS_LIMIT = 2;

  var UserCollection = Backbone.Collection.extend({
    initialize: function (options) {
    },
    model: function (attributes, options) {
      return new UserModel(attributes, options);
    }
  });

  function getUsersList() {
    var repositories = communicator.reqres.request('collection:getOrganizationRepositories');
    var usersList = [];
    var deferred = $.Deferred();
    var numRequests = 0;

    repositories.then(function (repositories) { 
      repositories.each(function (repository) {
        if(numRequests > MAX_REQUESTS_LIMIT - 1) {
          return false; 
        }
        usersList.push(repository.fetchUsers().then(function () {
          return repository.get('users');
        }));

        numRequests++;
      });

      deferred.resolve(usersList);
    });

    return deferred.promise();
  }

  function createUserCollection(repositoriesCollection, userCollection) {
    $.each(repositoriesCollection, function (index, repository) {
      repository.each(function (user) {
        userCollection.add(user);
        var tmpModel = userCollection.get(user.get('id'));

        if(tmpModel) {
          tmpModel.set('total', tmpModel.get('total') + user.get('total'));
        } else {
          userCollection.add(user);
        }
      });
    });
  }

  var userCollection;

  communicator.reqres.setHandler("collection:getUsers", function () {
    var deferred = $.Deferred();

    if(!userCollection) {
      var userCollection = new UserCollection();

      getUsersList().then(function (usersList) {
        $.when.apply(this, usersList).done(function () {
          var repositoriesCollection = Array.prototype.slice.call(arguments);
          createUserCollection(repositoriesCollection, userCollection);
          deferred.resolve(userCollection);
        });
      });
    } else {
      deferred.resolve(userCollection);
    }

    return deferred.promise();
  });

  return UserCollection;
});