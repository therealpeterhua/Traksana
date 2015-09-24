Trak.Models.Task = Backbone.Model.extend({
  urlRoot: "/api/tasks",

  toJSON: function() {
    return { task: this.attributes };
  },

  assignedUsers: function() {
    this._assignedUsers = this._assignedUsers || new Trak.Collections.Users();
    return this._assignedUsers;
  },

  comments: function() {
    this._comments = this._comments || new Trak.Collections.Comments();
    return this._comments
  },

  parse: function(response) {
    if (response.assigned_users) {
      this.assignedUsers().set(response.assigned_users);
      delete response.assigned_users;
    }

    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }

    return response;
  },
})
