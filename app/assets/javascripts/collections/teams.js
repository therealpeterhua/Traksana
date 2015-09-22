Trak.Collections.Teams = Backbone.Collection.extend({
  url: "/api/teams",
  model: Trak.Models.Team,

  getOrFetch: function(id) {
    var thisCollection = this;
    var getModel = thisCollection.get(id);

    if (getModel) {
      getModel.fetch();
    } else {
      getModel = new Trak.Models.Team({id: id});
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
