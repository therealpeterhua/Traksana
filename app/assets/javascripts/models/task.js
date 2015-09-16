Trak.Models.Task = Backbone.Model.extend({
  urlRoot: "/api/tasks",

  toJSON: function() {
    return {project: this.attributes};
  }  
})
