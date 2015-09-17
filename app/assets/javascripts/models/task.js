Trak.Models.Task = Backbone.Model.extend({
  urlRoot: "/api/tasks",

  toJSON: function() {
    return { task: this.attributes };
  }
})
