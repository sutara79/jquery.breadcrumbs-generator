describe('$.fn.breadcrumbsGenerator', function() {
  it('should return jQuery object', function() {
    var $foo = $('<ol id="foo">').appendTo('body');
    var returns = $foo.breadcrumbsGenerator();
    assert(returns === $foo);
    $foo.remove();
  });
});

describe('$.breadcrumbsGenerator.prototype._setOption', function() {
  it('should return default option', function() {
    var option = $.breadcrumbsGenerator.prototype._setOption();
    assert(option.sitemaps == '#sitemaps');
    assert(option.index_type == 'index.html');
  });
});
