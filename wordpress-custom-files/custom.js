var waitForEl = function(selector, callback) {
	if (jQuery(selector).length) {
		callback();
	} else {
		setTimeout(function() {
			waitForEl(selector, callback);
		}, 100);
	}
};

var currentPollInterval;

$j(document).ready(function() {

	const hasScrollButton = $j('.scroll').length > 0;
	const needsToRegisterOrLogin = $j('.showlogin').length > 0;
	const isNonMember = window.location.href.indexOf('non-member') > -1;
	const hutchQuote = $j('.yt-hutchinson');
	const daimiQuote = $j('.yt-daimi');
	const cobenQuote = $j('.yt-coben');
	const fileDownload = $j('.download-file');
	const loginLabel = $j('.tml-user-login-wrap');
	const isLoginPath = window.location.pathname.indexOf('join') > -1 || window.location.pathname.indexOf('login') > -1;
	const isPasswordPath = window.location.pathname.indexOf('lostpassword') > -1;
	const hasGalleryImages = $j('article.mix').length > 0;
	const $showMoreButton = `<div class="portfolio_paging"><span rel="8" class="load_more"><a href="#" id="show-more">Show more</a></span></div>`;
	const hasBillingFields = $j('#customer_details').length > 0;
	const isAddressPath = window.location.pathname.indexOf('edit-address') > -1;
	const isOrderPath =
		window.location.pathname.indexOf('order-received') > -1 || window.location.pathname.indexOf('view-order');
	const isInspirationPath = window.location.hash.indexOf('inspiration') > -1;
	const isQuotesPath = window.location.hash.indexOf('quotes') > -1;
	const isFormPath = window.location.pathname.indexOf('register') > -1 || window.location.pathname.indexOf('team-registration') > -1;
	const isAccountPath =
		window.location.pathname.indexOf('my-account') > -1 &&
		window.location.pathname.indexOf('my-account/edit-account') === -1;
	const showHomeFormSubmitMessage =
		localStorage.getItem('form-submitted') == 'true' && window.location.pathname === '/';
	const showFormSubmitMessage = localStorage.getItem('form-submitted') == 'true' && window.location.pathname !== '/';
	const hasFormErrors = window.location.href.indexOf('error') > -1;
	const redirectToRegistration =
		localStorage.getItem('invited-member') && window.location.pathname.indexOf('join') > -1;

	$j("a:contains('billing addresses')").text('shipping address');
	$j('.post_info').hide();
	$j('.entry_date ').hide();
	$j('.post_more')
		.find('a')
		.text('View');

	setInterval(function() {
		if ($j('.woocommerce-message').length > 0) {
			if (
				$j('.woocommerce-message')
					.html()
					.indexOf('Ornamental') > -1
			) {
				$j('.woocommerce-message')
					.html()
					.replace('“Ornamental Surfaces Sample Chain”', 'Ornamental Surfaces Sample Chain');
			} else if (
				$j('.woocommerce-message')
					.html()
					.indexOf('Interlock') > -1
			) {
				$j('.woocommerce-message')
					.html()
					.replace('“Interlock Reclaimed Barnwood Eco-Panels”', 'Interlock Reclaimed Barnwood Eco-Panels');
			} else if (
				$j('.woocommerce-message')
					.html()
					.indexOf('Infused') > -1
			) {
				$j('.woocommerce-message')
					.html()
					.replace('“Infused Glass Mosaics Sample Box”', 'Infused Glass Mosaics Sample Box');
			}
		}
	}, 300);

	$j('#chat').click(function() {
		olark('api.box.expand');
	});

	$j("#olark").click(function() {
		olark('api.box.expand')
	})

	$j(".material-gallery .mpc-item").on("click", function(e) {
		let sku = $j($j(e.currentTarget).find("img")[0]).attr("alt");
		$j(".mfp-title").html("<p style='color: white;'>" + sku + "</p>")
		initTitlePolling()
	})

	if (hasScrollButton) {
		$j('.scroll').on('click', function() {
			const elementClass = this.id.replace('to-', '.');
			$j('html, body').animate(
				{
					scrollTop: $j(elementClass).offset().top
				},
				1200
			);
		});
	}

	if (needsToRegisterOrLogin) {
		$j('.woocommerce-info').html(
			"You must be a registered Icons Club Member to place an order. Please register <a href='http://iconsclub.archsystems.com/register/'>here</a>"
		);
		setInterval(function() {
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

	if ($j('.rev-btn').length > 0 && $j(window).width() < 640) {
		$j($j('.rev-btn:even')).hide();
	}
	$j(window).resize(function() {
		if ($j('.rev-btn').length > 0 && $j(window).width() > 640) {
			$j($j('.rev-btn:even')).show();
		} else {
			$j($j('.rev-btn:even')).hide();
		}
	});

	if (
		$j('.cart_list')
			.find('li')
			.text() === 'No products in the cart.'
	) {
		$j('.cart_list')
			.find('li')
			.text('No requests made.');
	}

	$j('#gform_3').submit(function() {
		localStorage.setItem('form-submitted', true);
	});

	$j('#gform_8').submit(function() {
		localStorage.setItem('form-submitted', true);
	});

	$j('#gform_9').submit(function() {
		localStorage.setItem('form-submitted', true);
	});

	$j('#ship-to-different-address').hide();

	if (hasFormErrors) {
		$j('.form-text').html("Oops, that didn't seem to work.<br> Try sending your info again.");
		$j('.form-text').css('color', '#d88c2b');
	}

	if (showFormSubmitMessage) {
		setTimeout(function() {
			restoreForm();
		}, 15000);
		const successMessage = `<div data-id="mpc_callout-625977837bf2f07" class="mpc-callout mpc-callout--style_2 mpc-callout-submitted mpc-inited" style="opacity: 1;"><p>Thank you for submitting your design vision!</p><p>An ASI Material Expert will be in touch with you shortly.</p><div class="flex-row-center"><i class="mpc-icon-part mpc-regular mpc-transition"><img width="260" height="263" src="http://iconsclub.archsystems.com/wp-content/uploads/2016/06/Artboard-1@4x-1.png" class="attachment-full" alt=""></i></div></div>`;
		$j('.hide-on-submit').hide();
		$j($j('.form-container').find('.wpb_wrapper')[0]).html(successMessage);
	}

	if (showHomeFormSubmitMessage) {
		setTimeout(function() {
			restoreForm();
		}, 15000);
		$j('.mpc-callout--style_2').addClass('mpc-callout-submitted');
		$j('.mpc-callout--style_2').html(
			"<p>Thank you for submitting your design vision!</p><p>An ASI Material Expert will be in touch with you shortly.</p><div class='flex-row-center'><i class='mpc-icon-part mpc-regular mpc-transition'><img width='260' height='263' src='http://iconsclub.archsystems.com/wp-content/uploads/2016/06/Artboard-1@4x-1.png' class='attachment-full' alt=''></i></div>"
		);
	}

	if (isAccountPath) {
		$j($j('.woocommerce-MyAccount-content').find('p')[0]).hide();
	}

	if (isPasswordPath) {
		$j('.tml-action-links')
			.find('li')[1]
			.remove();
		$j('.tml-user-login-wrap')
			.find('label')
			.text('Email');
		$j('.message').text(
			'Please enter your email address. You will receive a link to create a new password via email.'
		);
	}

	if (isFormPath) {
		$j('form').submit(function() {
			localStorage.removeItem('invited-member');
			$j('.form-body').hide();
			$j('.form-footnote').hide();
			$j('.form-headline')
				.find('span')
				.text('Please Wait...');
			$j('.form-text')
				.find('.wpb_wrapper')
				.text("We're registering your info for Icon status.")
				.css('color', 'white');
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
		$j('.filter').on('click', function() {
			$j('#show-more').hide();
		});

		let addShowMoreButton = setInterval(function() {
			if (!isInspirationPath) {
				if ($j('article.mix')[$j('article.mix').length - 1].style['visibility'] === 'visible') {
					$j('article.mix:gt(7)').hide();
					$j('.projects_holder').after($showMoreButton);
					$j('#show-more').on('click', showMore);
					if (isQuotesPath) {
						$j('html, body').animate({ scrollTop: $j('.quotes').offset().top }, 1000);
					}
					clearInterval(addShowMoreButton);
				}
			}
		}, 300);
	}

	if (isLoginPath) {
		$j('#rememberme1').prop('checked', true);
		$j('.login-link').on('click', function() {
			$j('#rememberme1').prop('checked', true);
		});
	}

	if (loginLabel && isLoginPath) {
		loginLabel.find('label').text('Email');
		$j('.tml-action-links')
			.find('li')[0]
			.remove();
		$j('.tml-rememberme-wrap')
			.find('label')
			.text('');
		$j('.tml-rememberme-wrap').append('Remember me');
		$j('.tml-rememberme-wrap').css('display', 'inline');
		$j('.tml-rememberme-wrap').css('padding-left', '15px');
		$j('.tml-rememberme-wrap').css('padding-right', '15px');
		$j('.tml-rememberme-wrap').css('padding-top', '4px');
		$j('.tml-action-links')
			.find('li')
			.css('font-size', '16px');
		$j('.tml-action-links')
			.find('li')
			.css('margin-top', '15px');
	}

	if (hutchQuote.length > 0) {
		const icon = hutchQuote.find('.mpc-icon');
		icon.css('cursor', 'pointer');
		icon.on('click', linkToYouTubeVideoOfHutch);
	}

	if (daimiQuote.length > 0) {
		const icon = daimiQuote.find('.mpc-icon');
		icon.css('cursor', 'pointer');
		icon.on('click', linkToYouTubeVideoOfDaimi);
	}

	if (cobenQuote.length > 0) {
		const icon = cobenQuote.find('.mpc-icon');
		icon.css('cursor', 'pointer');
		icon.on('click', linkToYouTubeVideoOfCoben);
	}
	if (fileDownload.length > 0) {
		fileDownload.attr('download', '');
	}
});


function startGalleryPolling() {
	currentPollInterval = setInterval(currentPoll, 500);
}

function currentPoll() {
	if ($j(".mfp-title").length) {
		initTitlePolling();
	}
}

function initTitlePolling() {
	let populateSku = setInterval(function(){
		let imageSrc = $j(".mfp-img").attr("src");
		let sku = ""
		if (imageSrc) {
			sku = $j("img[src='" + imageSrc + "']")[1].alt;
		} else {
			startGalleryPolling();
		}
		$j(".mfp-title").html("<p style='color: white;'>" + sku + "</p>");		
		clearInterval(populateSku)
	}, 500)
}

function restoreForm() {
	$j('.hide-on-submit').show();
	localStorage.removeItem('form-submitted');
}

function populateLightboxText() {
	const linkToPortfolioItem = $j(this)
		.parents('.image_holder')
		.find('.portfolio_link_for_touch')[0].href;
	waitForEl('#fullResImage', function() {
		let textContainer = `<div class="lightboxText"></div>`;
		$j.get(linkToPortfolioItem, function(data) {
			let description = $j(textContainer)
				.hide()
				.append(
					$j(data)
						.find('.info.portfolio_content')
						.html()
				);
			$j('#fullResImage')
				.parent()
				.append(description);
			description.show('slow');
			let currentSlide = parseInt(
				$j('.currentTextHolder')
					.text()
					.split('/')[0]
			);
			$j('.pp_next').on('click', { slide: currentSlide, type: 'next' }, populateNextSlideText);
			$j('.pp_previous').on('click', { slide: currentSlide, type: 'previous' }, populateNextSlideText);
			$j('.pp_arrow_next').on('click', { slide: currentSlide, type: 'next' }, populateNextSlideText);
			$j('.pp_arrow_previous').on('click', { slide: currentSlide, type: 'previous' }, populateNextSlideText);
		});
	});
}

function populateNextSlideText(e) {
	let slideNumber = parseInt(
		$j(this)
			.parents('.pp_fade')
			.find('.currentTextHolder')
			.text()
			.split('/')[0]
	);
	let linkToNextPortfolioItem = '';
	if (e.data.type === 'next') {
		linkToNextPortfolioItem = `http://iconsclub.archsystems.com/projects/${slideNumber + 1}/`;
	} else if (e.data.type === 'previous') {
		linkToNextPortfolioItem = `http://iconsclub.archsystems.com/projects/${slideNumber - 1}/`;
	}
	let textContainer = `<div class="lightboxText"></div>`;
	$j.get(linkToNextPortfolioItem, function(data) {
		let description = $j(textContainer)
			.hide()
			.append(
				$j(data)
					.find('.info.portfolio_content')
					.html()
			);
		$j('#fullResImage')
			.parent()
			.append(description);
		description.show('slow');
	});
}

function showMore(e) {
	e.preventDefault();
	$j(this).hide();
	$j('article.mix:gt(7)').show();

	// const $appendedGallerySection = $j($j(".filler")[0]);

	// $appendedGallerySection.css("height", "100%");

	// $appendedGallerySection.css("font-size", "initial");

	// $appendedGallerySection.css("line-height", "0");

	// const $materialChallenge = `<div class="wpb_wrapper" style="border: 2px solid #d88c2b;"><div data-id="mpc_callout-125978c26e5904d" class="mpc-callout mpc-callout--style_2 mpc-inited gallery-callout" style="opacity: 1; min-height: initial;"><div class="mpc-callout__icon-wrap mpc-icon--image" ><div class="mpc-callout__icon" style="border-radius: 50%; border: 2px solid #d88c2b; margin-top: 5px;"><i class="mpc-transition "><img width="150" height="150" src="http://iconsclub.archsystems.com/wp-content/uploads/2016/06/Emerald-150x150.jpg" class="attachment-thumbnail" alt="" srcset="http://iconsclub.archsystems.com/wp-content/uploads/2016/06/Emerald-150x150.jpg 150w, http://iconsclub.archsystems.com/wp-content/uploads/2016/06/Emerald-300x300.jpg 300w, http://iconsclub.archsystems.com/wp-content/uploads/2016/06/Emerald-600x600.jpg 600w, http://iconsclub.archsystems.com/wp-content/uploads/2016/06/Emerald-570x570.jpg 570w, http://iconsclub.archsystems.com/wp-content/uploads/2016/06/Emerald-500x500.jpg 500w" sizes="(max-width: 150px) 100vw, 150px" style="width: 60px"></i></div></div><div class="mpc-callout__content"><h3 class="mpc-callout__heading" style="font-size: 10px !important">What's Your Material Challenge?</h3></div><div class="mpc-callout__button"><a href="#modal_id_59545c29a175e" target="" title="Link" data-id="mpc_button-975978c26e5918e" class="mpc-button mpc-transition mpc-inited" style="opacity: 1; overflow: inherit; padding: 5px; line-height: 1em; margin-top: 0px !important; border: 2px solid #d88c2b;"><div class="mpc-button__content mpc-effect-type--none mpc-effect-side--none"><span class="mpc-button__title mpc-transition">Let's Get Started</span></div><div class="mpc-button__background mpc-transition mpc-effect-type--fade mpc-effect-side--in"></div></a></div></div></div>`;

	// $appendedGallerySection.html($materialChallenge);
}

function playYouTubeVideo() {
	const youTubeIframe = `<iframe width="620" height="480" src="https://www.youtube.com/embed/0c0stsGBtnM?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
	$j('.yt-hutchinson')
		.find('.mpc-icon')
		.css('border-radius', '0');
	$j('.yt-hutchinson')
		.find('.mpc-icon')
		.css('border', 'none');
	$j('.yt-hutchinson')
		.find('.mpc-icon')
		.html(youTubeIframe);
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
