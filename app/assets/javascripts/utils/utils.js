(function() {
Trak.Utils = {};

Trak.Utils.imageName = function(user) {
  //If name has a space, do something.
  //ELSE...
  return user.escape('name').slice(0, 2).toUpperCase();
}
}) ();
