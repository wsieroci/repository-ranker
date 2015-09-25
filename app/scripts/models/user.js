define([
  'backbone',
  'backbone-associations',
  'backbone.marionette'
],
function( Backbone, Associations ) {
  'use strict';

  var UserModel = Associations.AssociatedModel.extend({
    defaults: {
      total: 0
    },
    initialize: function (model, options) {
      this.set('id', model.author.login);
      this._isAuthorComplete = false;
    },
    fetchAuthor: function () {
      if(this._isAuthorComplete === false) {
        this.url = 'https://api.github.com/users/' + this.author.login;
        this._isAuthorComplete = true
        return this.fetch();
      } else {
        var deferred = $.Deferred();
        deferred.resolve(this);
        return deferred.promise();
      }
    }
  });

  return UserModel;
});