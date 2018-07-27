/**
 * @file jquery.breadcrumbs-generator
 * @version 1.0.3
 * @author Yuusaku Miyazaki <toumin.m7@gmail.com>
 * @license MIT
 */
/*global jQuery*/
/** @external jQuery */
(function (factory) {
  if(typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'), window);
  } else {
    factory(jQuery, window);
  }
}(function($, window) {
  /**
   * @function external:jQuery.prototype.breadcrumbsGenerator
   * @arg {object} [option] - Options user sent
   * @arg {string} [option.sitemaps='#sitemaps'] - jQuery selector for sitemap
   * @arg {string} [option.index_type='index.html'] - Filename of directory index
   */
  $.fn.breadcrumbsGenerator = function(option) {
    return this.each(function() {
      new $.breadcrumbsGenerator(this, option);
    });
  };

  /**
   * @class external:jQuery.breadcrumbsGenerator
   * @arg {object} elem - Target element to apply this plugin
   * @arg {object} option - Options user sent
   * @prop {object} elem - Target element to apply this plugin
   * @prop {object} option - Initialized options
   */
  $.breadcrumbsGenerator = function(elem, option) {
    this.elem = elem;
    this.option = this._setOption(option);
    this._main();
  };

  $.extend($.breadcrumbsGenerator.prototype, /** @lends external:jQuery.breadcrumbsGenerator.prototype */ {
    /**
     * Initialize options
     * @private
     * @arg {object} option - Options user sent.
     * @return {object} initialized options.
     */
    _setOption: function(option) {
      return $.extend({
        sitemaps  : '#sitemaps',
        index_type: 'index.html'
      }, option);
    },

    /**
     * Generate breadcrumbs
     * @private
     */
    _main: function() {
      var target_path = window.location.pathname.split('/').pop();
      if (target_path == '') target_path = this.option.index_type;
      var target_elem = $(this.option.sitemaps).find('a[href*="' + target_path + '"]');

      // Evacuate contents before emptize
      var origin_elem = $(this.elem).children();
      $(this.elem).empty();

      // Generate breadcrumbs
      var self = this;
      $(target_elem)
        .parentsUntil(this.option.sitemaps)
        .filter(':has(> a[href])')
        .each(function() {
          $('<li>')
            .append($(this).children('a').clone())
            .prependTo(self.elem);
        });

      // Restore evacuated contents
      $(this.elem).prepend(origin_elem);

      // Remove link from current page in breadcrumbs
      $(this.elem)
        .find('a[href*="' + target_path + '"]')
        .each(function() {
          $(this).parent().text($(this).text());
        });
    }
  });
}));