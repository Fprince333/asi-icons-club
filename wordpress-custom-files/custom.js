'use strict';

var waitForEl = function waitForEl(selector, callback) {
	if (jQuery(selector).length) {
		callback();
	} else {
		setTimeout(function () {
			waitForEl(selector, callback);
		}, 100);
	}
};

var currentPollInterval;
var cartAndQuotePoll;

$j(document).ready(function () {

	var hasScrollButton = $j('.scroll').length > 0;
	var needsToRegisterOrLogin = $j('.showlogin').length > 0;
	var isNonMember = window.location.href.indexOf('non-member') > -1;
	var hutchQuote = $j('.yt-hutchinson');
	var daimiQuote = $j('.yt-daimi');
	var cobenQuote = $j('.yt-coben');
	var fileDownload = $j('.download-file');
	var loginLabel = $j('.tml-user-login-wrap');
	var isLoginPath = window.location.pathname.indexOf('join') > -1 || window.location.pathname.indexOf('login') > -1;
	var isPasswordPath = window.location.pathname.indexOf('lostpassword') > -1;
	var hasGalleryImages = $j('article.mix').length > 0;
	var $showMoreButton = '<div class="portfolio_paging"><span rel="8" class="load_more"><a href="#" id="show-more">Show more</a></span></div>';
	var hasBillingFields = $j('#customer_details').length > 0;
	var isAddressPath = window.location.pathname.indexOf('edit-address') > -1;
	var isOrderPath = window.location.pathname.indexOf('order-received') > -1 || window.location.pathname.indexOf('view-order');
	var isInspirationPath = window.location.hash.indexOf('inspiration') > -1;
	var isQuotesPath = window.location.hash.indexOf('quotes') > -1;
	var isFormPath = window.location.pathname.indexOf('register') > -1 || window.location.pathname.indexOf('team-registration') > -1;
	var isAccountPath = window.location.pathname.indexOf('my-account') > -1 && window.location.pathname.indexOf('my-account/edit-account') === -1;
	var showHomeFormSubmitMessage = localStorage.getItem('form-submitted') == 'true' && window.location.pathname === '/';
	var showFormSubmitMessage = localStorage.getItem('form-submitted') == 'true' && window.location.pathname !== '/';
	var hasFormErrors = window.location.href.indexOf('error') > -1;
	var redirectToRegistration = localStorage.getItem('invited-member') && window.location.pathname.indexOf('join') > -1;
	var hasCartOnPage = $j(".woocommerce-message:contains('cart')").length;
	var isSampleBagPath = window.location.pathname.indexOf('sample-bag') > -1;

	$j("a:contains('billing addresses')").text('shipping address');
	$j('.post_info').hide();
	$j('.entry_date ').hide();
	$j('.post_more').find('a').text('View');

	setInterval(function () {
		if ($j('.woocommerce-message').length > 0) {
			if ($j('.woocommerce-message').html().indexOf('Ornamental') > -1) {
				$j('.woocommerce-message').html().replace('“Ornamental Surfaces Sample Chain”', 'Ornamental Surfaces Sample Chain');
			} else if ($j('.woocommerce-message').html().indexOf('Interlock') > -1) {
				$j('.woocommerce-message').html().replace('“Interlock Reclaimed Barnwood Eco-Panels”', 'Interlock Reclaimed Barnwood Eco-Panels');
			} else if ($j('.woocommerce-message').html().indexOf('Infused') > -1) {
				$j('.woocommerce-message').html().replace('“Infused Glass Mosaics Sample Box”', 'Infused Glass Mosaics Sample Box');
			}
		}
	}, 300);

	$j('#chat').click(function () {
		olark('api.box.expand');
	});

	$j("#olark").click(function () {
		olark('api.box.expand');
	});

	$j(".material-gallery .mpc-item").on("click", function (e) {
		var sku = $j($j(e.currentTarget).find("img")[0]).attr("alt");
		$j(".mfp-title").html("<p style='color: white;'>" + sku + "</p>");
	});

	if (hasScrollButton) {
		$j('.scroll').on('click', function () {
			var elementClass = this.id.replace('to-', '.');
			$j('html, body').animate({
				scrollTop: $j(elementClass).offset().top
			}, 1200);
		});
	}

	if (needsToRegisterOrLogin) {
		$j('.woocommerce-info').html("You must be a registered Icons Club Member to place an order. Please register <a href='https://iconsclub.archsystems.com/register/'>here</a>");
		setInterval(function () {
			if ($j('.checkout').length > 0 && $j('.checkout').is(':visible')) {
				$j('.checkout').hide();
			}
		}, 300);
	}

	if (isNonMember) {
		localStorage.setItem('invited-member', true);
	}

	if (redirectToRegistration) {
		window.location = '/register/';
	}

	if (isSampleBagPath) {
		initCartAndQuoteRemovalPolling();
	}

	if (hasCartOnPage) {
		var modifiedCartString = $j(".woocommerce-message:contains('cart')").html().replace("cart", "sample bag").replace("“", "").replace("”", "");
		$j(".woocommerce-message:contains('cart')").html(modifiedCartString);
		initCartAndQuoteRemovalPolling();
	}

	if ($j('.rev-btn').length > 0 && $j(window).width() < 640) {
		$j($j('.rev-btn:even')).hide();
	}
	$j(window).resize(function () {
		if ($j('.rev-btn').length > 0 && $j(window).width() > 640) {
			$j($j('.rev-btn:even')).show();
		} else {
			$j($j('.rev-btn:even')).hide();
		}
	});

	if ($j('.cart_list').find('li').text() === 'No products in the cart.') {
		$j('.cart_list').find('li').text('No requests made.');
	}

	$j('#gform_3').submit(function () {
		localStorage.setItem('form-submitted', true);
	});

	$j('#gform_8').submit(function () {
		localStorage.setItem('form-submitted', true);
	});

	$j('#gform_9').submit(function () {
		localStorage.setItem('form-submitted', true);
	});

	$j('#ship-to-different-address').hide();

	if (hasFormErrors) {
		$j('.form-text').html("Oops, that didn't seem to work.<br> Try sending your info again.");
		$j('.form-text').css('color', '#d88c2b');
	}

	if (showFormSubmitMessage) {
		setTimeout(function () {
			restoreForm();
		}, 15000);
		var successMessage = '<div data-id="mpc_callout-625977837bf2f07" class="mpc-callout mpc-callout--style_2 mpc-callout-submitted mpc-inited" style="opacity: 1;"><p>Thank you for submitting your design vision!</p><p>An ASI Material Expert will be in touch with you shortly.</p><div class="flex-row-center"><i class="mpc-icon-part mpc-regular mpc-transition"><img width="260" height="263" src="https://iconsclub.archsystems.com/wp-content/uploads/2016/06/Artboard-1@4x-1.png" class="attachment-full" alt=""></i></div></div>';
		$j('.hide-on-submit').hide();
		$j($j('.form-container').find('.wpb_wrapper')[0]).html(successMessage);
	}

	if (showHomeFormSubmitMessage) {
		setTimeout(function () {
			restoreForm();
		}, 15000);
		$j('.mpc-callout--style_2').addClass('mpc-callout-submitted');
		$j('.mpc-callout--style_2').html("<p>Thank you for submitting your design vision!</p><p>An ASI Material Expert will be in touch with you shortly.</p><div class='flex-row-center'><i class='mpc-icon-part mpc-regular mpc-transition'><img width='260' height='263' src='https://iconsclub.archsystems.com/wp-content/uploads/2016/06/Artboard-1@4x-1.png' class='attachment-full' alt=''></i></div>");
	}

	if (isAccountPath) {
		$j($j('.woocommerce-MyAccount-content').find('p')[0]).hide();
	}

	if (isPasswordPath) {
		$j('.tml-action-links').find('li')[1].remove();
		$j('.tml-user-login-wrap').find('label').text('Email');
		$j('.message').text('Please enter your email address. You will receive a link to create a new password via email.');
	}

	if (isFormPath) {
		$j('form').submit(function () {
			localStorage.removeItem('invited-member');
			$j('.form-body').hide();
			$j('.form-footnote').hide();
			$j('.form-headline').find('span').text('Please Wait...');
			$j('.form-text').find('.wpb_wrapper').text("We're registering your info for Icon status.").css('color', 'white');
		});
	}

	if (isOrderPath) {
		$j('.woocommerce-column--billing-address').hide();
		$j('.product-total').hide();
		$j('.total').hide();
	}

	if (isAddressPath) {
		$j($j('.address')[0]).hide();
		$j('.col-2').css('width', '100%');
	}

	if (hasBillingFields) {
		$j('<h3>Shipping Details</h3>').insertAfter('#ship-to-different-address');
		$j('.col-1').hide();
	}

	if (hasGalleryImages) {
		$j('a.lightbox.qbutton').on('click', populateLightboxText);
		$j('.filter').on('click', function () {
			$j('#show-more').hide();
		});
		$j(".mood-board-img img").css("width", $j(".mood-board-img").parent().width())

		var addShowMoreButton = setInterval(function () {
			if (!isInspirationPath) {
				if ($j('article.mix')[$j('article.mix').length - 1].style['visibility'] === 'visible') {
					$j('article.mix:gt(7)').hide();
					$j('.projects_holder').after($showMoreButton);
					$j('#show-more').on('click', showMore);
					if (isQuotesPath) {
						$j('html, body').animate({
							scrollTop: $j('.quotes').offset().top
						}, 1000);
					}
					clearInterval(addShowMoreButton);
				}
			}
		}, 300);
	}

	if (isLoginPath) {
		$j('#rememberme1').prop('checked', true);
		$j('.login-link').on('click', function () {
			$j('#rememberme1').prop('checked', true);
		});
	}

	if (loginLabel && isLoginPath) {
		loginLabel.find('label').text('Email');
		$j('.tml-action-links').find('li')[0].remove();
		$j('.tml-rememberme-wrap').find('label').text('');
		$j('.tml-rememberme-wrap').append('Remember me');
		$j('.tml-rememberme-wrap').css('display', 'inline');
		$j('.tml-rememberme-wrap').css('padding-left', '15px');
		$j('.tml-rememberme-wrap').css('padding-right', '15px');
		$j('.tml-rememberme-wrap').css('padding-top', '4px');
		$j('.tml-action-links').find('li').css('font-size', '16px');
		$j('.tml-action-links').find('li').css('margin-top', '15px');
	}

	if (hutchQuote.length > 0) {
		var icon = hutchQuote.find('.mpc-icon');
		icon.css('cursor', 'pointer');
		icon.on('click', linkToYouTubeVideoOfHutch);
	}

	if (daimiQuote.length > 0) {
		var _icon = daimiQuote.find('.mpc-icon');
		_icon.css('cursor', 'pointer');
		_icon.on('click', linkToYouTubeVideoOfDaimi);
	}

	if (cobenQuote.length > 0) {
		var _icon2 = cobenQuote.find('.mpc-icon');
		_icon2.css('cursor', 'pointer');
		_icon2.on('click', linkToYouTubeVideoOfCoben);
	}
	if (fileDownload.length > 0) {
		fileDownload.attr('download', '');
	}
});

function initCartAndQuoteRemovalPolling() {
	cartAndQuotePoll = setInterval(removeCartAndQuotes, 200);
}

function removeCartAndQuotes() {
	if ($j(".woocommerce-message:contains('removed')").length) {
		var modifiedQuotesString = $j(".woocommerce-message:contains('removed')").html().replace("“", "").replace("”", "");
		$j(".woocommerce-message:contains('removed')").html(modifiedQuotesString);
		clearInterval(cartAndQuotePoll);
	}
	if ($j(".cart-empty").length === 2) {
		$j(".cart-empty")[1].remove();
		$j(".cart-empty").text("Your bag is currently empty.");
		clearInterval(cartAndQuotePoll);
	}
}

function currentPoll() {
	if ($j(".mfp-title").length) {
		initTitlePolling();
	}
}

function restoreForm() {
	$j('.hide-on-submit').show();
	localStorage.removeItem('form-submitted');
}

function populateLightboxText() {
	var linkToPortfolioItem = $j(this).parents('.image_holder').find('.portfolio_link_for_touch')[0].href;
	waitForEl('#fullResImage', function () {
		var textContainer = '<div class="lightboxText"></div>';
		$j.get(linkToPortfolioItem, function (data) {
			var description = $j(textContainer).hide().append($j(data).find('.info.portfolio_content').html());
			$j('#fullResImage').parent().append(description);
			description.show('slow');
			var currentSlide = parseInt($j('.currentTextHolder').text().split('/')[0]);
			$j('.pp_next').on('click', {
				slide: currentSlide,
				type: 'next'
			}, populateNextSlideText);
			$j('.pp_previous').on('click', {
				slide: currentSlide,
				type: 'previous'
			}, populateNextSlideText);
			$j('.pp_arrow_next').on('click', {
				slide: currentSlide,
				type: 'next'
			}, populateNextSlideText);
			$j('.pp_arrow_previous').on('click', {
				slide: currentSlide,
				type: 'previous'
			}, populateNextSlideText);
		});
	});
}

function populateNextSlideText(e) {
	var slideNumber = parseInt($j(this).parents('.pp_fade').find('.currentTextHolder').text().split('/')[0]);
	var linkToNextPortfolioItem = '';
	if (e.data.type === 'next') {
		linkToNextPortfolioItem = 'https://iconsclub.archsystems.com/projects/' + (slideNumber + 1) + '/';
	} else if (e.data.type === 'previous') {
		linkToNextPortfolioItem = 'https://iconsclub.archsystems.com/projects/' + (slideNumber - 1) + '/';
	}
	var textContainer = '<div class="lightboxText"></div>';
	$j.get(linkToNextPortfolioItem, function (data) {
		var description = $j(textContainer).hide().append($j(data).find('.info.portfolio_content').html());
		populateText(description);
	});
}

function populateText(text) {
	var poll = setInterval(function () {
		if ($j("#fullResImage").length > 0) {
			$j("#fullResImage").parent().append(text);
			text.show("slow");
			clearInterval(poll);
		}
	}, 200);
}

function showMore(e) {
	e.preventDefault();
	$j(this).hide();
	$j('article.mix:gt(7)').show();
}

function linkToYouTubeVideoOfHutch() {
	var youTubeLink = 'https://youtu.be/0c0stsGBtnM';
	window.open(youTubeLink);
}

function linkToYouTubeVideoOfDaimi() {
	var youTubeLink = 'https://youtu.be/rtxYieiz8ok';
	window.open(youTubeLink);
}

function linkToYouTubeVideoOfCoben() {
	var youTubeLink = 'https://youtu.be/kMhaZ05jPFE';
	window.open(youTubeLink);
}