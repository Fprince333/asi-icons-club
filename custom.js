jQuery(document).ready(function() {
  const addBackground = $j(".tiled-background").length;
  if (addBackground) {
    let imageUrl = `http://iconsclub.archsystems.com/wp-content/uploads/2017/06/Artboard-1-e1498313654166.jpg`;
    $j("body").addClass("membership-form");
    $j(".wrapper").css("background-image", "url(" + imageUrl + ")");
    $j(".wrapper").css("background-size", "100% auto");
    $j(".wrapper").css("background-repeat", "no-repeat");
    $j(".wrapper").css("height", "100%");
    $j(".wrapper").css("width", "100vw");
    $j(".full_width").css("background-color", "black");
    $j(".wrapper_inner").css("padding-top", "10vh");
    $j(".wrapper_inner").css("padding-bottom", "10vh");
  } else {
    console.log("Don't add background");
  }
});
