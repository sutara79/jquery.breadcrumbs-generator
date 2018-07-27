describe('$.fn.breadcrumbsGenerator', () => {
  it('should return jQuery object', () => {
    const $foo = $('<ol id="foo">').appendTo('body');
    const returns = $foo.breadcrumbsGenerator();
    assert.strictEqual(returns, $foo);
    $foo.remove();
  });
});

describe('$.breadcrumbsGenerator.prototype._setOption', () => {
  it('should return default option', () => {
    const option = $.breadcrumbsGenerator.prototype._setOption();
    assert.equal(option.sitemaps, '#sitemaps');
    assert.equal(option.index_type, 'index.html');
  });
});
