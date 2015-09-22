Trak.Models.Task = Backbone.Model.extend({
  urlRoot: "/api/tasks",

  toJSON: function() {
    return { task: this.attributes };
  },

  assignedUsers: function() {
    this._assignedUsers = this._assignedUsers || new Trak.Collections.Users();
    return this._assignedUsers;
  },

  parse: function(response) {
    if (response.assigned_users) {
      this.assignedUsers().set(response.assigned_users);
      delete response.assigned_users;
    }

    return response;
  },
})
