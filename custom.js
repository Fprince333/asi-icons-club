jQuery(document).ready(function() {
  const showModal = $j("#wpmem_restricted_msg").length;
  if (showModal) {
    const regHtmlContent = $j("#wpmem_restricted_msg").parent().children();
    removeRegForm(regHtmlContent);
    const regModal = $j('<div class="reg-modal"></div>');
    const regModalWrapper = $j('<div class="reg-modal-inner"></div>');
    const loginLegend = `<a name="login"></a><form action="http://iconsclub.archsystems.com/" method="POST" id="login-form" class="form"><fieldset><legend>Log In with Your Icons Club Account</legend><label for="log">Email </label><div class="div_text"><input name="log" type="text" id="log" value="" class="username"></div><label for="pwd">Password</label><div class="div_text"><input name="pwd" type="password" id="pwd" class="password"></div><input name="redirect_to" type="hidden" value="http://iconsclub.archsystems.com/"><input name="a" type="hidden" value="login"><div class="button_div"><span id="register">Sign Up for the Icons club</span><span><input name="rememberme" type="checkbox" id="rememberme" value="forever">&nbsp;<label for="rememberme">Remember Me</label></span><span><input type="submit" name="Submit" value="Log In" class="buttons"></span></div><div align="right" class="link-text">Forgot password?&nbsp;<a href="http://iconsclub.archsystems.com/profile/?a=pwdreset">Click here to reset</a></div></fieldset></form>`;
    const regLegend = `<a name="register"></a><form name="form" method="post" action="http://iconsclub.archsystems.com/" id="registration-form" class="form hidden"><span id="login">Back to Login</span><fieldset><legend>Create Your Icons Club Account</legend><label for="first_name" class="text">First Name<span class="req">*</span></label><div class="div_text"><input name="first_name" type="text" id="first_name" value="" class="textbox" required=""></div><label for="last_name" class="text">Last Name<span class="req">*</span></label><div class="div_text"><input name="last_name" type="text" id="last_name" value="" class="textbox" required=""></div><label for="addr1" class="text">Address 1<span class="req">*</span></label><div class="div_text"><input name="addr1" type="text" id="addr1" value="" class="textbox" required=""></div><label for="addr2" class="text">Address 2</label><div class="div_text"><input name="addr2" type="text" id="addr2" value="" class="textbox"></div><label for="city" class="text">City<span class="req">*</span></label><div class="div_text"><input name="city" type="text" id="city" value="" class="textbox" required=""></div><label for="thestate" class="text">State<span class="req">*</span></label><div class="div_text"><input name="thestate" type="text" id="thestate" value="" class="textbox" required=""></div><label for="zip" class="text">Zip<span class="req">*</span></label><div class="div_text"><input name="zip" type="text" id="zip" value="" class="textbox" required=""></div><label for="country" class="text">Country<span class="req">*</span></label><div class="div_text"><input name="country" type="text" id="country" value="" class="textbox" required=""></div><label for="phone1" class="text">Phone<span class="req">*</span></label><div class="div_text"><input name="phone1" type="text" id="phone1" value="" class="textbox" required=""></div><label for="user_email" class="text">Email<span class="req">*</span></label><div class="div_text"><input name="user_email" type="email" id="user_email" value="" class="textbox" required=""></div><label for="password" class="text">Password<span class="req">*</span></label><div class="div_text"><input name="password" type="password" id="password" class="textbox" required=""></div><input name="a" type="hidden" value="register"><input name="wpmem_reg_page" type="hidden" value="http://iconsclub.archsystems.com/"><div class="button_div"><input name="submit" type="submit" value="Register" class="buttons"></div><div class="req-text"><span class="req">*</span>Required field</div></fieldset></form>`;
    regHtmlContent[1].innerHTML = loginLegend;
    regHtmlContent[2].innerHTML = regLegend;
    $j(regHtmlContent[1]).appendTo(regModalWrapper);
    $j(regHtmlContent[2]).appendTo(regModalWrapper);
    $j(".wrapper").css("z-index", "2147483641");
    regModal.append(regModalWrapper);
    regModal.prependTo(".wrapper");
    $j("#register").on("click", toggleForms);
    $j("#login").on("click", toggleForms);
  } else {
    console.log("Already logged in");
  }

  function removeRegForm(html) {
    html.remove();
  }

  function toggleForms() {
    $j("#registration-form").toggleClass("hidden");
    $j("#login-form").toggleClass("hidden");
  }
});
