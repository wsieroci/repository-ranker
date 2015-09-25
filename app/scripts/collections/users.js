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

  var MAX_REQUESTS_LIMIT = 2;

  var UsersRepositoryCollection = Backbone.Collection.extend({
    initialize: function (models, options) {
      var name = '';
      this._repository = options.repository;
      name = this._repository.get('full_name');
      this.url = 'https://api.github.com/repos/' + name + '/stats/contributors?client_id=7afd6b8573c9b0fadc21&client_secret=74e744a109e702226c7232aa6d1493c9fead4018';
    },
    model: function (attributes, options) {
      return new UserModel(attributes, options);
    }
  });

  var UserCollection = Backbone.Collection.extend({
    initialize: function (options) {
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
      repositories.each(function (repository) {
        var usersRepositoryCollection = new UsersRepositoryCollection([], {repository: repository});
        if(numRequests > MAX_REQUESTS_LIMIT - 1) {
          return false; 
        }
        userRepositories.push(usersRepositoryCollection.fetch().then(function () {
          return usersRepositoryCollection;
        }));

        numRequests++;
      });

      deferred.resolve(userRepositories);
    });

    return deferred.promise();
  }

  var userCollection;

  communicator.reqres.setHandler("collection:getUsers", function () {
    var deferred = $.Deferred();

    if(!userCollection) {
      var userCollection = new UserCollection();

      getUserRepositories().then(function (userRepositories) {
        $.when.apply(this, userRepositories).done(function () {
          var repositoriesCollection = Array.prototype.slice.call(arguments);
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

          deferred.resolve(userCollection);
        });
      });
    } else {
      deferred.resolve(userCollection);
    }

    return deferred.promise();
  });

  return UserRepositoryCollection;
});