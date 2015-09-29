define([
  'communicator',
  'backbone',
  'underscore',
  'backbone-associations',
  'backbone.marionette'
],
function( communicator, Backbone, _, Associations ) {
  'use strict';

  var USERS_API = 'https://api.github.com/users/<%= login %>?client_id=7afd6b8573c9b0fadc21&client_secret=74e744a109e702226c7232aa6d1493c9fead4018';

  var UserModel = Associations.AssociatedModel.extend({
    defaults: {
      total: 0
    },
    initialize: function (model, options) {
      if(_.isUndefined(model.author)) {
        throw Error('API error');
      }
      this.set('id', model.author.login);
      this._isAuthorComplete = false;
    },
    fetchAuthor: function () {
      if(this._isAuthorComplete === false) {
        var authorModel = new Backbone.Model();
        authorModel.url = _.template(USERS_API)({login: this.get('author').login});
        this._isAuthorComplete = true
        return authorModel.fetch().then(function () {
          this.set('author', authorModel.attributes);
          return this;
        }.bind(this));
      } else {
        var deferred = $.Deferred();
        deferred.resolve(this);
        return deferred.promise();
      }
    },
    addRepository: function(repository) {
      if(_.isUndefined(this.get('repositories'))) {
        this.set('repositories', new Backbone.Collection());
      }
      this.get('repositories').add(repository);
    }
  });

  communicator.reqres.setHandler('model:getUser', function (id) {
    var users = communicator.reqres.request('collection:getUsers');
    return users.then(function (users) {
      return users.get(id);
    });
  });

  return UserModel;
});