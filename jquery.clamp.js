(function($) {
  function mutableClamp($el, lines, moreText, lessText) {
    var text = $el.text(),
        partialText = '',
        chars = text.split(''),
        $clampTop = $('<span class="clamp-visible"></span>'),
        $clampTopText = $('<span></span>'),
        $clampBottom = $('<span class="clamp-hidden"></span>')
                          .text(text + ' ').hide(),
        $clampEllipsis = $('<span>... </span>'),
        $clampLink = $('<a class="clamp-link" href="#"></a>')
                          .text(moreText),
        $hideLink = $('<a class="clamp-link" href="#"></a>').text(lessText),
        lineHeight = parseInt($el.css('line-height')) + 1,
        maxHeight = lineHeight * lines,
        nextChar;

    if ($el.height() < maxHeight) {
      return;
    }

    $el.text('');
    $clampBottom.append($hideLink);
    $clampTop.append($clampTopText, $clampEllipsis, $clampLink);
    $el.append($clampTop, $clampBottom);

    while ($clampTop.height() < maxHeight) {
      nextChar = chars.shift();
      if (typeof nextChar === 'undefined') {
        $el.text(text);
        return;
      }
      partialText += nextChar;
      $clampTopText.text(partialText);
    }
    $clampTopText.text($clampTopText.text().slice(0, -1));

    $clampLink.on('click', function(e) {
      e.preventDefault();
      $clampTop.hide();
      $clampBottom.show();
    });
    $hideLink.on('click', function(e) {
      e.preventDefault();
      $clampTop.show();
      $clampBottom.hide();
    });
  }

  $.fn.clamp = function(lines, moreText, lessText) {
    var $el = this;
    if (typeof moreText === 'undefined') {
      moreText = 'show more';
    }
    if (typeof lessText === 'undefined') {
      lessText = lessText || 'show less';
    }
    $el.each(function() {
      mutableClamp($(this), lines, moreText, lessText);
    });
    return $el;
  };
})(jQuery);