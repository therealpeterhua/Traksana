Trak.Collections.Tasks = Backbone.Collection.extend({
  url: "/api/tasks",
  model: Trak.Models.Task,

  getOrFetch: function(id) {
    var thisCollection = this;
    var getModel = thisCollection.get(id);

    if (getModel) {
      getModel.fetch();
    } else {
      getModel = new Trak.Models.Task({ id: id });
      thisCollection.add(getModel);
      getModel.fetch({
        error: function() {
          thisCollection.remove(getModel);
        }
      })
    }

    return getModel;
  },

  comparator: function(task) {
    return task.escape('ord');
  }
})
