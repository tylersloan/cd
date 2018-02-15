var DROPDOWN = {
  CLASS: {
    OPEN: 'dd-opened',
  },
};
var FONT_WEIGHTS = {
  // mapped to match fonts.scss
  LIGHT:      'fw-300',
  NORMAL:     'fw-400',
  BOLD:       'fw-700',
  EXTRA_BOLD: 'fw-800i',
};
var CLASSLIST = {
  IS_VISIBLE: 'is-visible',
};

function floatLabel(targets) {
  // https://codepen.io/soulrider911/pen/ugnyl
  $(targets).each(function() {
    var $this = $(this);

    $this.focus(function(){
      $this.addClass('isDirty');
    });

    $this.blur(function(){
      if($this.val() === '') {
        $this.removeClass('isDirty');
      }
    });
  });
}

$(document).ready(function() {
  var $html = $('html');
  var $pageNavItems = $('.js-page-nav-item');
  var $pageMenuItems = $('.js-page-menu-item');

  $pageNavItems.on('click', function(e) {
    e.preventDefault();

    var $this = $(this);
    var page = $this.attr('href').split('/')[1];

    $html.attr('data-page', page);
    $pageNavItems.removeClass(FONT_WEIGHTS.BOLD).addClass(FONT_WEIGHTS.LIGHT);
    $this.removeClass(FONT_WEIGHTS.LIGHT).addClass(FONT_WEIGHTS.BOLD);
  });
  $pageMenuItems.on('click', function(e) {
    e.preventDefault();

    var $this = $(this);
    $this.toggleClass(DROPDOWN.CLASS.OPEN);
  });

  if ($('.js-review-star').length) {
    var $stars = $('.js-review-star');
    $stars.on('click', function() {
      var $this = $(this);
      var thisIndex = jQuery.inArray($this[0], $stars);

      $($('[data-stars]')[0]).attr('data-stars', thisIndex + 1);
    })
  }

  // just a simple jquery .load call to see different sections without so many similar files
  if ($('.js-admin-nav').length) {
    // go ahead and start off at confirmation
    $('#js-dropzone').load('/admin/confirmation.html #body', function() {
      if ($('.js-nice-select').length) { $('.js-nice-select').niceSelect(); }
      if ($('.label--float .input').length) { floatLabel('.label--float .input') }
      if ($('.js-modal-wrapper').length) {
        $("[data-action='edit-review']").on('click', function() {
          $('.js-modal-wrapper').addClass('is-open');
        });

        $("[data-action='cancel-review']").on('click', function() {
          $('.js-modal-wrapper').removeClass('is-open');
        });
      }
    });

    var $adminNavItems = $('.js-admin-nav');
    $adminNavItems.on('click', function(e) {
      e.preventDefault();
      var $this = $(this);
      var $target = $this.data('target');

      $adminNavItems.removeClass(FONT_WEIGHTS.BOLD).addClass(FONT_WEIGHTS.LIGHT);
      $this.removeClass(FONT_WEIGHTS.LIGHT).addClass(FONT_WEIGHTS.BOLD);

      if ($target === 'orders' || $target === 'reviews') {
        $('#js-entire-page-dropzone').load('/admin/' + target + '.html #body', function() {
          if ($('.js-nice-select').length) { $('.js-nice-select').niceSelect(); }
          if ($('.label--float .input').length) { floatLabel('.label--float .input') }

          if (target === 'reviews') {
            if ($('.js-modal-wrapper').length) {
              $("[data-action='edit-review']").on('click', function() {
                $('.js-modal-wrapper').addClass('is-open');
              });

              $("[data-action='cancel-review']").on('click', function() {
                $('.js-modal-wrapper').removeClass('is-open');
              });

              $reviewResponseField = $('#response-field');
              $respondButton = $("[data-action='show-respond-textarea']");
              $cancelResponseButton = $("[data-action='hide-respond-textarea']");
              $updateReviewButton = $("[data-action='update-review']");

              $respondButton.on('click', function(e) {
                e.preventDefault();
                $respondButton.removeClass(CLASSLIST.IS_VISIBLE);
                $cancelResponseButton.addClass(CLASSLIST.IS_VISIBLE);
                $reviewResponseField.addClass(CLASSLIST.IS_VISIBLE);
                $updateReviewButton.html('Update and Respond');
              });

              $cancelResponseButton.on('click', function(e) {
                e.preventDefault();
                $respondButton.addClass(CLASSLIST.IS_VISIBLE);
                $cancelResponseButton.removeClass(CLASSLIST.IS_VISIBLE);
                $reviewResponseField.removeClass(CLASSLIST.IS_VISIBLE);
                $updateReviewButton.html('Update');
              });
            }
          }
        })
      } else {
        $('#js-dropzone').load('/admin/' + $target + '.html #body', function() {
          if ($('.js-nice-select').length) { $('.js-nice-select').niceSelect(); }
          if ($('.label--float .input').length) { floatLabel('.label--float .input') }

          if ($target === 'product') {
            $contractButton = $('[data-action="contract-products"]');

            $contractButton.on('click', function(e) {
              $('.js-contract-zone').toggle();
              $contractButton.html($contractButton.html() === 'Contract' ? 'Show all' : 'Contract')
            })
          }
        })
      }
    })
  }
});
