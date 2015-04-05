# jquery.breadcrumbs-generator
A jQuery plugin for generating a breadcrumbs automatically from sitemaps.  
If you can use a server-side language (e.g. PHP, Ruby, Perl), you don't need this plugin.

![screenshot](http://www.usamimi.info/~sutara/sample2/breadcrumbs-generator/sample/ss1.png)

- Demo: [www.usamimi.info/~sutara/sample2/breadcrumbs-generator/](//www.usamimi.info/~sutara/sample2/breadcrumbs-generator/)
- JSDoc: [www.usamimi.info/~sutara/sample2/breadcrumbs-generator/jsdoc](//www.usamimi.info/~sutara/sample2/breadcrumbs-generator/jsdoc)
- GitHub: [github.com/sutara79/jquery.breadcrumbs-generator](//github.com/sutara79/jquery.breadcrumbs-generator)

## Usage
##### &lt;head&gt;
```html
<script src="//code.jquery.com/jquery.min.js"></script>
<script src="jquery.breadcrumbs-generator.js"></script>
<script>
	jQuery(document).ready(function($) {
		$('#breadcrumbs').breadcrumbsGenerator();
	});
</script>
```

##### &lt;body&gt;
```html
<ol id="breadcrumbs"></ol>
<ul id="sitemaps">
	<li>
		<a href="index.html">Home</a>
		<ul>
			<li><a href="menu1.html">Menu1</a></li>
			<li><a href="menu2.html">Menu2</a></li>
			<li><a href="menu3.html">Menu3</a></li>
		</ul>
	</li>
</ul>
```

## Note
##### Breadcrumbs structure
This plugin creates like `<li><a href="#">foo</a></li>`.  
So, you should use `<ol>` or `<ul>` for breadcrumbs.

##### Sitemaps structure
This plugin searches for current-page and its ancestors in href-attributes of the sitemaps.  
So, you don't use href-attribute for other purpose in the sitemaps.

##### How to move the home-link to the list of breadcrumbs
If you use `#sitemaps` as a global-navi, and don't need the home-link, you can also move it to `#breadcrumbs`.

```html
<ol id="breadcrumbs"><li><a href="index.html">Home</a></li></ol>
<ul id="sitemaps">
	<li><a href="menu1.html">Menu1</a></li>
	<li><a href="menu2.html">Menu2</a></li>
	<li><a href="menu3.html">Menu3</a></li>
</ul>
```

## Options
You can set two options like followings.

```javascript
$('#breadcrumbs').breadcrumbsGenerator({
	// default value
	sitemaps: '#sitemaps',
	index_type: 'index.html'
});
```

##### index_type
This is for when the requested url is a directory (e.g. `example.com/`) but not a file (e.g. `example.com/index.html`).

## Author
Yuusaku Miyazaki (宮崎 雄策)

- Mail: <toumin.m7@gmail.com>
- Twitter: [twitter.com/sutara_lumpur](//twitter.com/sutara_lumpur)
- Blog: [sutara79.hatenablog.com/entry/2015/04/04/215219](//sutara79.hatenablog.com/entry/2015/04/04/215219)

## License
[MIT License](http://www.opensource.org/licenses/mit-license.php)