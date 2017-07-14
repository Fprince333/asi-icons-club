$j(document).ready(function() {
  const hutchQuote = $j(".yt-hutchinson");
  if (hutchQuote.length > 0) {
    const icon = hutchQuote.find(".mpc-icon");
    icon.css("cursor", "pointer");
    icon.on("click", playYouTubeVideo);
  }
});

function playYouTubeVideo() {
  const youTubeIframe = `<iframe width="620" height="480" src="https://www.youtube.com/embed/0c0stsGBtnM?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
  $j(".yt-hutchinson").find(".mpc-icon").css("border-radius", "0");
  $j(".yt-hutchinson").find(".mpc-icon").css("border", "none");
  $j(".yt-hutchinson").find(".mpc-icon").html(youTubeIframe);
}
