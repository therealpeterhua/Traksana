Trak.Views.Master = Backbone.CompositeView.extend({
  template: JST['master/master'],
  className: 'master',

  render: function() {
    this.$el.html( this.template() )
    this.populatePaneViews();

    return this;
  },

  populatePaneViews: function() {
    var sidebarView = new Trak.Views.Sidebar({
      model: this.model
    });
    this.addSubview('.sidebar', sidebarView);
  }
  //PH** - add other panes same way
})
