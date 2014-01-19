# Ext.ux.Ajax

A revisited Ajax class for ExtJS and Sencha Touch.

It works with javascript promises.

## Dependencies

[`Ext.ux.Deferred`](https://github.com/wilk/Ext.ux.Deferred)

## Problem
`Ext.Ajax` singleton is uncomfortable because it puts you in the condition to make [Pyramids of Doom](http://tritarget.org/blog/2012/11/28/the-pyramid-of-doom-a-javascript-style-trap/) and this is very annoying, indeed =(
Let me show you an example:

```javascript
Ext.Ajax.request ({
	url: 'data.json' ,
	success: function (data) {
		Ext.Ajax.request ({
			url: 'data2.json' ,
			success: function (data2) {
				Ext.Ajax.request ({
					url: 'data3.json' ,
					success: function (data3) {
						alert ("It's so hard to reach the top!");
					} ,
					failure: errorHandler
				});
			} ,
			failure: errorHandler
		});
	} ,
	failure: errorHandler
});
```

Uh, it's really hard to reach the top of the Pyramid, innit?

Let's see what we can do with a cool jetpack: let me introduce you the new `Ext.ux.Ajax`:

```javascript
Ext.ux.Ajax
	.request ('data.json')
	.then (Ext.ux.Ajax.request ('data2.json'), errorHandler)
	.then (Ext.ux.Ajax.request ('data3.json'), errorHandler)
	.then (function (data3) {
		alert ("Ah! That's much better ;)");
	}, errorHandler);
```

`Ext.ux.Ajax` works with [`Ext.ux.Deferred`](https://github.com/wilk/Ext.ux.Deferred) and each request returns a new promise.
It easily allows to handle different requests with joy!

## No more boilerplates
And what about boilerplates?

```javascript
Ext.Ajax.request ({
	url: 'user/add' ,
	method: 'POST' ,
	success: successHandler ,
	failure: errorHandler
});
```

Why should I repeat {url: 'an/url', method: 'GET/POST'} every time?
Say hello to the new syntax:

```javascript
// Url passed as a string param
Ext.ux.Ajax.request ('data.json');

// chainable methods!
Ext.ux.Ajax
	.request ('data.json')
	.done (successHandler)
	.fail (errorHandler);

// get/post methods!
Ext.ux.Ajax
	.get ('data.json')
	//.post ('data.json')
	//.put ('data.json')
	//.delete ('data.json')
	//.head ('data.json')
	.done (successHandler)
	.fail (errorHandler);
```

## Sync the async!
With `Ext.ux.Deferred` we can synchronize different AJAX requests in one single shot:

```javascript
Ext.ux.Deferred
	.when (Ext.ux.Ajax.get ('data1.json'), Ext.ux.Ajax.get ('data2.json'), Ext.ux.Ajax.get ('data3.json'))
	.then (function (data1, data2, data3) {
		// have fun with your data =)
	}, errorHandler);
```

## Install via Bower
First of all, install [**Bower**](http://bower.io/).

Then install `Ext.ux.Ajax`:

```bash
$ bower install ext.ux.ajax
```

Now, you got the extension at the following path: *YOUR_PROJECT_PATH/bower_components/ext.ux.ajax/*

It contains **Ajax.js** and a minified version **Ajax.min.js**.

Let's setup the **Ext.Loader** to require the right file:

```javascript
Ext.Loader.setConfig ({
	enabled: true ,
	paths: {
		'Ext.ux.Ajax': 'bower_components/ext.ux.ajax/Ajax.js' ,
		// or the minified one: 'Ext.ux.Ajax': 'bower_components/ext.ux.ajax/Ajax.min.js' ,
		// Require the Ext.ux.Deferred dependency
		'Ext.ux.Deferred': 'bower_components/ext.ux.deferred/Deferred.js'
		// or the minified one: 'Ext.ux.Deferred': 'bower_components/ext.ux.deferred/Deferred.min.js'
	}
});

Ext.require (['Ext.ux.Ajax']);
```

## Usage
Load `Ext.ux.Ajax` via `Ext.require`:

```javascript
Ext.Loader.setConfig ({
	enabled: true
});

Ext.require (['Ext.ux.Ajax']);
```

Now, you are ready to use them in your code as follows:

```javascript
Ext.ux.Ajax
	.request ('data.json')
	.done (successHandler)
	.fail (errorHandler);
```

## Documentation
You can build the documentation (like ExtJS Docs) with [**jsduck**](https://github.com/senchalabs/jsduck):

```bash
$ jsduck ux --output /var/www/docs
```

It will make the documentation into docs dir and it will be visible at: http://localhost/docs

## License
The MIT License (MIT)

Copyright (c) 2013 Vincenzo Ferrari <wilk3ert@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
