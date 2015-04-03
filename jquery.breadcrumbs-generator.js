/**
 * @file jQuery Plugin: jquery.breadcrumbs-generator
 * @version 1.0.0
 * @author Yuusaku Miyazaki [toumin.m7@gmail.com]
 * @license MIT License
 */
(function($) {

/**
 * @desc プラグインをjQueryのプロトタイプに追加する
 * @global
 * @memberof jQuery
 * @param {Object} [option] オプションを格納した連想配列
 * @param {string|Object} [option.sitemap='#sitemap'] - サイトマップのHTML要素、またはそのセレクタ
 * @param {string|Object} [option.index_path='index.html'] - ホームへのパス
 */
$.fn.breadcrumbsGenerator = function(option) {
	return this.each(function() {
		new BreadcrumbsGenerator(this, option);
	});
};

/**
 * @global
 * @constructor
 * @classdesc 要素ごとに適用される処理を集めたクラス
 * @param {Object} elem - プラグインを適用するHTML要素
 * @param {Object} option - オプションを格納した連想配列
 *
 * @prop {Object} elem - プラグインを適用するHTML要素
 * @prop {Object} option - オプションを格納した連想配列
 */
function BreadcrumbsGenerator(elem, option) {
	this.elem = elem;
	this.option = this.setOption(option);
	this.main();
}

$.extend(BreadcrumbsGenerator.prototype, /** @lends BreadcrumbsGenerator.prototype */ {
	/**
	 * @private
	 * @desc オプションの初期化
	 * @param {Object} option - 連想配列の形式のオプション
	 */
	setOption: function(option) {
		return $.extend({
			sitemap    : '#sitemap',
			index_path : 'index.html'
		}, option);
	},

	/**
	 * @private
	 * @desc パンくず生成の処理の本体
	 */
	main: function() {
		var target_path = window.location.pathname.split("/").pop();
		if (target_path == '') target_path = this.option.index_path;
		var target_elem = $(this.option.sitemap).find('a[href*="' + target_path + '"]');

		// ホームへのリンクが存在する場合、prependに備えて退避させておく。
		var origin_elem = $(this.elem).children();
		$(this.elem).empty();

		var self = this;
		$(target_elem)
			.parentsUntil(sitemap)
			.filter(':has(> a[href])')
			.each(function() {
				$('<li>')
					.append($(this).children('a').clone())
					.prependTo(self.elem);
			});

		// 退避させたものを追加する
		$(this.elem).prepend(origin_elem);

		// 現在のページはリンクを外す
		$(this.elem)
			.find('a[href*="' + target_path + '"]')
			.each(function() {
				$(this).parent().text($(this).text());
			});
	}
}); // end of "$.extend"

})( /** namespace */ jQuery);