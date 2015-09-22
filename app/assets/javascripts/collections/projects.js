Trak.Collections.Projects = Backbone.Collection.extend({
  url: "/api/projects",
  model: Trak.Models.Project,

  getOrFetch: function(id) {
    var thisCollection = this;
    var getModel = thisCollection.get(id);

    if (getModel) {
      getModel.fetch();
    } else {
      getModel = new Trak.Models.Project({id: id});
      thisCollection.add(getModel);
      getModel.fetch({
        error: function() {
          thisCollection.remove(getModel);
        }
      });
    }
    return getModel;
  },
})
