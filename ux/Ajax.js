/**
 * @class Ext.ux.Ajax
 * @author Vincenzo Ferrari <wilk3ert@gmail.com>
 *
 * A revisited Ajax class for ExtJS and Sencha Touch.
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
	 * @param {String} url Url of the request
	 * @param {Object} extraParams Extra params of the request
	 * @param {Object} opts Other extra params of the request
	 * @return {Ext.ux.Deferred} A new promise
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
	 * Makes a new Ajax request, with 'GET' method
	 * @param {String} url Url of the request
	 * @param {Object} extraParams (optional) Extra params of the request
	 * @return {Ext.ux.Deferred} A new promise
	 */
	get: function (url, extraParams) {
		return this.makeDeferred (url, extraParams, {method: 'GET'});
	} ,
	
	/**
	 * @method post
	 * Makes a new Ajax request, with 'POST' method
	 * @param {String} url Url of the request
	 * @param {Object} extraParams (optional) Extra params of the request
	 * @return {Ext.ux.Deferred} A new promise
	 */
	post: function (url, extraParams) {
		return this.makeDeferred (url, extraParams, {method: 'POST'});
	} ,
	
	/**
	 * @method delete
	 * Makes a new Ajax request, with 'DELETE' method
	 * @param {String} url Url of the request
	 * @param {Object} extraParams (optional) Extra params of the request
	 * @return {Ext.ux.Deferred} A new promise
	 */
	delete: function (url, extraParams) {
		return this.makeDeferred (url, extraParams, {method: 'DELETE'});
	} ,
	
	/**
	 * @method put
	 * Makes a new Ajax request, with 'PUT' method
	 * @param {String} url Url of the request
	 * @param {Object} extraParams (optional) Extra params of the request
	 * @return {Ext.ux.Deferred} A new promise
	 */
	put: function (url, extraParams) {
		return this.makeDeferred (url, extraParams, {method: 'PUT'});
	} ,
	
	/**
	 * @method head
	 * Makes a new Ajax request, with 'HEAD' method
	 * @param {String} url Url of the request
	 * @param {Object} extraParams (optional) Extra params of the request
	 * @return {Ext.ux.Deferred} A new promise
	 */
	head: function (url, extraParams) {
		return this.makeDeferred (url, extraParams, {method: 'HEAD'});
	} ,
	
	/**
	 * @method request
	 * Makes a new Ajax request and returns a promise
	 * @param {String} url Url of the request
	 * @param {Object} extraParams (optional) Extra params of the request
	 * @return {Ext.ux.Deferred} A new promise
	 */
	request: function (url, extraParams) {
		return this.makeDeferred (url, extraParams);
	}
});
