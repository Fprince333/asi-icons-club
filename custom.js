jQuery(document).ready(function() {
  const showModal = $j("#wpmem_restricted_msg").length;
  if (showModal) {
    const regHtmlContent = $j("#wpmem_restricted_msg").parent().children();
    removeRegForm(regHtmlContent);
    const regModal = $j('<div class="reg-modal"></div>');
    const regModalWrapper = $j('<div class="reg-modal-inner"></div>');
    regModalWrapper.html(regHtmlContent);
    regModal.append(regModalWrapper);
    regModal.prependTo(".wrapper");
  } else {
    console.log("Already logged in");
  }

  function removeRegForm(html) {
    html.remove();
  }
});
