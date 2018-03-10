/**
 * Sample RESTlet Code
 * 
 * Version    Date            Author           Remarks
 * 1.0        04 Jan 2016     Marcel Pestana   Initial Version
 *
 */

/**
 * @param {Object} dataIn Parameter object
 * @returns {Object} Output object
 */
function getData(dataIn) {
	
	var result = new Result();
	
	try {		
		result.data = app.getData(dataIn);
		
		result.success = true;
	}
	catch(e) {
		result.success = false;
		
		result.AddError('E001', 'An error occurred. ' + (e instanceof nlobjError ? 'Code: ' + e.getCode() + ' - Details: ' + e.getDetails() : 'Details: ' + e));
	}
	return result;		
}

/**
 * @param {Object} dataIn Parameter object
 * @returns {Object} Output object
 */
function postData(dataIn) {
	
	var result = new Result();
	
	try {		
		result.data = app.postData(dataIn);
		
		result.success = true;
	}
	catch(e) {
		result.success = false;
		
		result.AddError('E002', 'An error occurred. ' + (e instanceof nlobjError ? 'Code: ' + e.getCode() + ' - Details: ' + e.getDetails() : 'Details: ' + e));
	}
	return result;		
}

/**
 * @param {Object} dataIn Parameter object
 * @returns {Void} 
 */
function deleteData(dataIn) {

	var result = new Result();
	
	try {		
		result.data = app.deleteData(dataIn);
		
		result.success = true;
	}
	catch(e) {
		result.success = false;
		
		result.AddError('E003', 'An error occurred. ' + (e instanceof nlobjError ? 'Code: ' + e.getCode() + ' - Details: ' + e.getDetails() : 'Details: ' + e));
	}
	return result;		
}

/**
 * @param {Object} dataIn Parameter object
 * @returns {Object} Output object 
 */
function putData(dataIn) {
	
	var result = new Result();
	
	try {		
		result.data = app.postData(dataIn);
		
		result.success = true;
	}
	catch(e) {
		result.success = false;
		
		result.AddError('E004', 'An error occurred. ' + (e instanceof nlobjError ? 'Code: ' + e.getCode() + ' - Details: ' + e.getDetails() : 'Details: ' + e));
	}
	return result;		
}


var app = ( function() {
	
	/**
	 * @param {Object} dataIn Parameter object
	 * @returns {Void} 
	 */
	var getData = function(dataIn) {
		
		return nlapiLoadRecord(dataIn.recordType, dataIn.internalId);
	};
	
	/**
	 * @param {Object} dataIn Parameter object
	 * @returns {Void} 
	 */
	var postData = function(dataIn) {
		
		var objRet = {}, 
			record,
			fieldName,
			internalId;
		
		// If Internal id is provided, updates the record
		if (dataIn.internalId) {
			record = nlapiLoadRecord(dataIn.recordType, dataIn.internalId);	
		} else {
			record = nlapiCreateRecord(dataIn.recordType);	
		}			
		
		// Updates each field
		for (fieldName in dataIn) {
			if (dataIn.hasOwnProperty(fieldName)) {
				if (fieldName != 'recordType' && fieldName != 'id') {
					var value = dataIn[fieldName];
					
					if (value && typeof value != 'object') {
						record.setFieldValue(fieldName, value);
					}
				}
			}
		}	    
		
		nlapiSubmitRecord(record, true, true);
		
		return record;
	};
	
	/**   
	 * Delete data
	 * 
	 * @param {Object} dataIn Object with parameters

	 * @returns {Void}
	 */
	var deleteData = function(dataIn) {
		// Deletes the record
		nlapiDeleteRecord(dataIn.recordType, dataIn.internalId);
	}; 

	return {
		getData : getData,
		postData : postData,
		deleteData : deleteData
	};
})();
