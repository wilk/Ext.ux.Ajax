Ext.Loader.setConfig ({
	enabled: true ,
	paths: {
		'Ext.ux': '../ux'
	}
});

Ext.require (['Ext.ux.Ajax']);

Ext.onReady (function () {
	Ext.ux.Ajax
		.request ('data/data.json', {
			method: 'GET'
		})
		.done (function (data) {
			console.log ('Data retrieved successfully with: ', data.responseText);
		})
		.fail (function (data) {
			console.log ('Data retrieve failed with: ', data.responseText);
		});
	
	Ext.ux.Deferred
		.when (Ext.ux.Ajax.get ('data/data1.json'), Ext.ux.Ajax.get ('data/data2.json'), Ext.ux.Ajax.get ('data/data3.json'))
		.then (function (data1, data2, data3) {
			console.log ('Follows JSON data: ', data1.responseText, data2.responseText, data3.responseText);
		});
});
