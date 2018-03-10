/**
 * Library with some useful methods
 * 
 * Version    Date            Author           Remarks
 * 1.00       04 Jan 2016     Marcel Pestana   Initial Version
 *
 */

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