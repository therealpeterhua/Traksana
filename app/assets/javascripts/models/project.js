Trak.Models.Project = Backbone.Model.extend({
  url: "/api/projects",

  toJSON: function() {
    return {project: this.attributes};
  },

  tasks: function() {
    this._tasks = this._tasks || new Trak.Collections.Tasks();

    return this._tasks
  },

  parse: function(response) {
    if (response.tasks) {
      this.tasks().set(response.tasks);
      delete response.tasks
    }

    return response;
  }
})
