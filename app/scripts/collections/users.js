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

  var MAX_REQUESTS_LIMIT = -1;

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
        if(MAX_REQUESTS_LIMIT !== -1 && numRequests > MAX_REQUESTS_LIMIT - 1) {
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
        var tmpModel = userCollection.get(user.get('id'));

        if(tmpModel) {
          tmpModel.set('total', tmpModel.get('total') + user.get('total'));
          tmpModel.set('repositories', tmpModel.get('repositories').add(user.get('repositories').models));
        } else {
          userCollection.add(user);
        }
      });
    });
  }

  function fetchAuthors(userCollection) {
    var array = userCollection.toArray();
    var numRequests = 0;
    var promiseCollection = [];
    var deferred = $.Deferred(); 

    $.each(array, function (index, user) {
      promiseCollection.push(user.fetchAuthor());
      if(MAX_REQUESTS_LIMIT !== -1 && numRequests > MAX_REQUESTS_LIMIT - 1) {
        return false; 
      }
      numRequests++;
    });

    $.when.apply(this, promiseCollection).done(function () {
      deferred.resolve();
    });

    return deferred.promise();
  }

  var userCollection;

  communicator.reqres.setHandler("collection:getUsers", function () {
    var deferred = $.Deferred();

    if(!userCollection) {
      userCollection = new UserCollection();

      getUsersList().then(function (usersList) {
        $.when.apply(this, usersList).done(function () {
          var repositoriesCollection = Array.prototype.slice.call(arguments);
          createUserCollection(repositoriesCollection, userCollection);

          fetchAuthors(userCollection).then(function () {
            userCollection.comparator = communicator.reqres.request('comparator:get', 'contributions');
            userCollection.sort();

            deferred.resolve(userCollection);
          });
        });
      });
    } else {
      deferred.resolve(userCollection);
    }

    return deferred.promise();
  });

  return UserCollection;
});