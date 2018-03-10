/**
 * Library with some useful methods
 * 
 * Version    Date            Author           Remarks
 * 1.00       04 Jan 2016     Marcel Pestana   Initial Version
 *
 */

/**   
 * Checks if the object contains a value
 * 
 * @param {Object} obj Object to compare

 * @returns {Boolean} Indicates if the object contains a value
 */
function hasValue(obj) {
	
	return obj != null && obj != undefined;
}

/**   
 * Checks if the object is not empty
 * 
 * @param {Object} obj Object to compare
 *
 * @returns {Boolean} Indicates if the object contains a value different than empty
 */
function isNotEmpty(obj) {
	
	return obj != null && obj != undefined && obj != '' && typeof obj != 'undefined';
}

/**   
 * Result object
 * 
 * @returns {Object} Result object
 */
function Result() {
	
	this.success = false;
	this.data = null;
	this.errors = [];

	this.AddError = function(errorType, message) {
		
		var error = new Error();
		error.message = message;
		error.errortype = errorType;

		this.errors.push(error);
	}

	function Error() {		
		this.message = '';
		this.errortype = '';
	}
}