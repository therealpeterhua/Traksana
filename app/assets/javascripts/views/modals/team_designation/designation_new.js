Trak.Views.DesignationNew = Backbone.CompositeView.extend({
  template: JST['modals/team_designation/designation_new'],
  className: 'new-designation-container',

  events: {
    'input input.user-search': 'retrieveSearchResults'
  },

  initialize: function() {
    this.collection = new Trak.Collections.Users();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
  },

  retrieveSearchResults: function(e) {
    var searchQuery = $(e.currentTarget).val();
    if (searchQuery.length === 0) {
      this.collection.reset();
      this.renderResults(this.collection);
    } else {
      var data = {search_query: searchQuery};

      $.ajax({
        url: '/api/users/search',
        method: 'get',
        data: data,
        dataType: 'json',
        success: function(response) {
          this.collection.set(response);
          this.renderResults(this.collection);
        }.bind(this)
      });
    }
  },

  renderResults: function(searchResults) {
    var resultsView = new Trak.Views.DesignationNewList({
      collection: this.filtered(searchResults)
    });

    this._switchResultsView(resultsView);
  },

  filtered: function(searchResults) {
    var currMemberIds = Trak.currentTeam.members().pluck('id');
    var filtered = searchResults.filter( function(user) {
      return currMemberIds.indexOf(user.id) === -1;
    });

    var filteredResults = new Trak.Collections.Users(filtered);
    return filteredResults;
  },

  _switchResultsView: function(view) {
    this._resultsView && this._resultsView.remove();
    this._resultsView = view;

    this.$('div.returned-matches').html(this._resultsView.render().$el);
  },
})
