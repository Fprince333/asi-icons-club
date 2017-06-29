// Pardot form handler
jQuery(document).ready(function($) {
  // set the pardot form handler url and form element id
  const partdotFormHandlerURL =
    "http://www2.archsystems.com/l/67312/2017-06-26/9zsvcx";
  const formElementID = "um_form_memberregistration";
  const firstName = $("#um_field_3_memberregistration").val();
  const lastName = $("#um_field_4_memberregistration").val();
  const title = $("#um_field_6_memberregistration").val();
  const company = $("#um_field_8_memberregistration").val();
  const email = $("#um_field_9_memberregistration").val();

  $("body").append(
    '<iframe id="pardot-form-handler" height="0" width="0" style="position:absolute; left:-100000px; top:-100000px" src="javascript:false;"></iframe>'
  );
  $("#" + formElementID).attr(
    "action",
    "javascript:postToPardot('" + $("#" + formElementID).attr("action") + "')"
  );
});

function postToPardot(formAction) {
  $("#pardot-form-handler").load(function() {
    $("#" + formElementID).attr("action", formAction);
    $("#" + formElementID).submit();
  });
  $("#pardot-form-handler").attr(
    "src",
    partdotFormHandlerURL +
      "?" +
      "email=" +
      email +
      "&first_name=" +
      firstName +
      "&last_name=" +
      lastName +
      "&title=" +
      title +
      "&company=" +
      company
  );
}
