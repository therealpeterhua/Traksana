(function() {
Trak.Utils = {};

Trak.Utils.imageName = function(user) {
  //If name has a space, do something.
    //name matches any letters + space + letters?
    //split on space, take the first two of each
  //ELSE...

  return user.escape('name').slice(0, 2).toUpperCase();
}
}) ();
