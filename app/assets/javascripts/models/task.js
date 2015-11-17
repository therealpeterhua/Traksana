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

  stories: function() {
    this._stories = this._stories || new Trak.Collections.Stories();
    return this._stories
  },

  parse: function(response) {
    if (response.assigned_users) {
      this.assignedUsers().set(response.assigned_users);
      delete response.assigned_users;
    }

    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    if (response.stories) {
      this.stories().set(response.stories, { parse: true });
      delete response.stories;
    }

    return response;
  },
})
