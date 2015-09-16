Trak.Collections.Teams = Backbone.Collection.extend({
  model: Trak.Models.Team,
  url: "/api/teams",

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
  }

})
