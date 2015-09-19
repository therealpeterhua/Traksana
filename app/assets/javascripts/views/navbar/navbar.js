Trak.Views.Navbar = Backbone.CompositeView.extend({
  template: JST['navbar/navbar'],
  className: 'navbar',

  render: function() {
    this.$el.html(this.template());
    this.addUserCornerView();
    return this;
  },

  addUserCornerView: function() {
    var userCornerView = new Trak.Views.UserCorner();
    this.addSubview('div.user-container', userCornerView);
  }
})
