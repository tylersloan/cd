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

$(document).ready(function() {
  // custom select dropdowns
  // https://github.com/hernansartorio/jquery-nice-select
  $('.js-nice-select').niceSelect();

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
});
