/**
 * @class Ext.ux.Ajax
 * @author Vincenzo Ferrari <wilk3ert@gmail.com>
 *
 * A revised Ajax class for ExtJS and Sencha Touch.
 * It works with javascript promises (Ext.ux.Deferred).
 *
 * @singleton
 */
Ext.define ('Ext.ux.Ajax', {
	singleton: true ,
	
	requires: ['Ext.ux.Deferred', 'Ext.data.Connection'] ,
	
	/**
	 * @property connection
	 * @private
	 */
	connection: Ext.create ('Ext.data.Connection') ,
	
	/**
	 * @method makeDeferred
	 * @private
	 */
	makeDeferred: function (url, extraParams, opts) {
		var dfd = Ext.create ('Ext.ux.Deferred') ,
			params = {
				success: function () {
					dfd.resolve.apply (dfd, arguments);
				} ,
				failure: function () {
					dfd.reject.apply (dfd, arguments);
				}
			};
		
		extraParams = extraParams || {};
		extraParams.url = url;
		opts = opts || {};
		
		Ext.apply (params, opts);
		Ext.apply (extraParams, params);
		
		this.connection.request (extraParams);
		
		return dfd;
	} ,
	
	/**
	 * @method get
	 * @param url {String}
	 * @param extraParams {Object} (optional)
	 * @return {Ext.ux.Deferred} A new promise
	 */
	get: function (url, extraParams) {
		return this.makeDeferred (url, extraParams, {method: 'GET'});
	} ,
	
	/**
	 * @method post
	 * @param url {String}
	 * @param extraParams {Object} (optional)
	 * @return {Ext.ux.Deferred} A new promise
	 */
	post: function (url, extraParams) {
		return this.makeDeferred (url, extraParams, {method: 'POST'});
	} ,
	
	/**
	 * @method request
	 * @param url {String}
	 * @param extraParams {Object} (optional)
	 * @return {Ext.ux.Deferred} A new promise
	 */
	request: function (url, extraParams) {
		return this.makeDeferred (url, extraParams);
	}
});
