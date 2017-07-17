$j(document).ready(function() {
  const hutchQuote = $j(".yt-hutchinson");
  const daimiQuote = $j(".yt-daimi");
  const cobenQuote = $j(".yt-coben");
  const fileDownload = $j(".download-file");
  const loginLabel = $j(".tml-user-login-wrap");
  const isLoginPath =
    window.location.pathname.indexOf("join") > -1 ||
    window.location.pathname.indexOf("login") > -1;

  if (loginLabel && isLoginPath) {
    loginLabel.find("label").text("Email");
    $j(".tml-action-links").find("li")[0].remove();
    $j(".tml-rememberme-wrap").find("label").text("");
    $j(".tml-rememberme-wrap").append("Remember me");
    $j(".tml-rememberme-wrap").css("display", "inline");
    $j(".tml-rememberme-wrap").css("padding-left", "15px");
    $j(".tml-rememberme-wrap").css("padding-top", "4px");
    $j(".tml-action-links").find("li").css("font-size", "16px");
    $j(".tml-action-links").find("li").css("margin-top", "15px");
  }

  if (hutchQuote.length > 0) {
    const icon = hutchQuote.find(".mpc-icon");
    icon.css("cursor", "pointer");
    icon.on("click", linkToYouTubeVideoOfHutch);
  }

  if (daimiQuote.length > 0) {
    const icon = daimiQuote.find(".mpc-icon");
    icon.css("cursor", "pointer");
    icon.on("click", linkToYouTubeVideoOfDaimi);
  }

  if (cobenQuote.length > 0) {
    const icon = cobenQuote.find(".mpc-icon");
    icon.css("cursor", "pointer");
    icon.on("click", linkToYouTubeVideoOfCoben);
  }
  if (fileDownload.length > 0) {
    fileDownload.attr("download", "");
  }
});

function playYouTubeVideo() {
  const youTubeIframe = `<iframe width="620" height="480" src="https://www.youtube.com/embed/0c0stsGBtnM?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
  $j(".yt-hutchinson").find(".mpc-icon").css("border-radius", "0");
  $j(".yt-hutchinson").find(".mpc-icon").css("border", "none");
  $j(".yt-hutchinson").find(".mpc-icon").html(youTubeIframe);
}

function linkToYouTubeVideoOfHutch() {
  let youTubeLink = `https://youtu.be/0c0stsGBtnM`;
  window.open(youTubeLink);
}

function linkToYouTubeVideoOfDaimi() {
  let youTubeLink = `https://youtu.be/rtxYieiz8ok`;
  window.open(youTubeLink);
}

function linkToYouTubeVideoOfCoben() {
  let youTubeLink = `https://youtu.be/kMhaZ05jPFE`;
  window.open(youTubeLink);
}
