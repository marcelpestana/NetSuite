/**
 * Sample Suitelet Form Code
 * 
 * Version    Date            Author           Remarks
 * 1.00       04 Jan 2016     Marcel Pestana   Initial Version
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response) {

	if (request.getMethod() == 'GET') {      
        app.handleGet();
    }
    else {
    	app.handlePost();
    }
}

var app = ( function() {

	var FORM_NAME = 'Customers',			// Form Name
		LIST_NAME = 'Customers List',		// List Name
		SUBMIT_BUTTON = 'Submit',			// Submit button caption
		MAX_RECORDS = 10,					// Maximum number of records to display on the sublist
		MARKALL_ENABLED	= true;				// Mark all option enabled
	
	/**
	 * Handles Suitelet GET Method
	 * 
	 * @returns {Void}
	 */
	var handleGet = function() {
		
		var form,
			subList,
			searchResults;
		
		try {
			form = nlapiCreateForm(FORM_NAME, false);
			   
			//form.setScript('customscript_c2b_payment_cs');
			   			
			addFilters(form);
			   
			addButtons(form);
			  
			// Creates and inserts the sublist on the form
			subList = getSubList(form);
			  
			// Gets the search results to be displayed
			searchResults = getSearchResults();
			  
			// Populates the sublist based on the search results
			populateSubList(subList, searchResults);
			
			// Displays the page
			response.writePage(form);
		}
		catch(e) {		
			displayMessage('An error occurred. ' + (e instanceof nlobjError ? 'Code: ' + e.getCode() + ' - Details: ' + e.getDetails() : 'Details: ' + e));		
		}		
	};

	/**
	 * Handles Suitelet POST method
	 * 
	 * @returns {Void} 
	 */
	var handlePost = function() {
		
	    for (var i = 1; i <= request.getLineItemCount('custpage_sublist'); i++) {
			
	        if (request.getLineItemValue('custpage_sublist', 'custpage_selected', i) == 'T') {
	        	
	        	// TODO: Process the line
	        }
	    }

	    // Reloads window
	    handleGet();  
	};

	/**
	 * Add Buttons
	 * 
	 * @param {nlobjForm} form Object containing the form

	 * @returns {Void} 
	 */
	var addButtons = function(form) {
		
	   form.addSubmitButton(SUBMIT_BUTTON);
	   
	    //form.addButton('custombutton','Filtrar','filterData()');
	};

	/**
	 * Add Filter fields to the Form
	 * 
	 * @param {nlobjForm} form Object containing the form

	 * @returns {Void} 
	 */
	var addFilters = function(form) {
		
	    var internalId = form.addField('custpage_internalid', 'text', 'Internal Id', null);
	    
	    if (isNotEmpty(request.getParameter('custpage_internalid'))) internalId.setDefaultValue(request.getParameter('custpage_internalid')); 
	};

	/**
	 * Add a sublist to the Form
	 * 
	 * @param {nlobjForm} form Object containing the form

	 * @returns {Void} 
	 */
	var getSubList = function(form) {
		
	    var subList = form.addSubList('custpage_sublist' , 'list' , LIST_NAME , 'general');

	    // TODO: Add fields to the SubList	    
	    if (MARKALL_ENABLED) subList.addField('custpage_selected', 'checkbox', 'Selected');    
	   
	    subList.addField('custpage_internalid', 'text', 'InternalId');
	    subList.addField('custpage_name', 'text', 'Name' );  
	  
	    // Add an option to mark all items    	
	    if (MARKALL_ENABLED) subList.addMarkAllButtons();
	    
	    return subList;
	};

	/**
	 * Populate the SubList
	 * 
	 * @param {nlobjSublist} list Object sublist
	 * @param {nlobjSearchResults} searchResults Object search results
	 * 
	 * @returns {Void} 
	 */
	var populateSubList = function(list, searchResults) {
		
		var searchLength = (searchResults ? searchResults.length : 0),
			i = 0;
		
		// Checks if needs to display only a number of records
		if (MAX_RECORDS) searchLength = searchLength > MAX_RECORDS ? MAX_RECORDS : searchLength;
		
		for (i = 0; i < searchLength; i++) {
			
			// TODO: Set the field values
			list.setLineItemValue('custpage_internalid', i + 1	, searchResults[i].getValue('internalid'));
			list.setLineItemValue('custpage_name', i + 1		, searchResults[i].getValue('companyname'));            
		}
	};

	/**
	 * Get the Searh Results
	 * 
	 * @returns {Void} 
	 */
	var getSearchResults = function() {
		
		var filters = [],
			columns = [],
			i = 0;
		
		// TODO: Add filters   
		if (isNotEmpty(request.getParameter('custpage_internalid'))) filters[i++] = new nlobjSearchFilter('internalid', null, 'is', request.getParameter('custpage_internalid'));
		
		i = 0;
		   
		// TODO: Add result columns
		columns[i++] = new nlobjSearchColumn('internalid');
		columns[i++] = new nlobjSearchColumn('companyname');
	    
		// TODO: Set the record
		return nlapiSearchRecord('customer', null, filters, columns);       
	};

	/**
	 * Displays a message
	 * 
	 * @param {String} message Message
	 * @returns {Void}
	 */
	var displayMessage = function(message) {
		
		// Create a NetSuite form
	    var form = nlapiCreateForm(FORM_NAME, false),
	    	html = message;
	    
	    // Add a new HTML field to display the HTML contents
	    field = form.addField('file', 'inlinehtml', 'label');
	    field.setLayoutType('outsidebelow');
	    field.setDefaultValue('<font size="2pt">' + html + '</font>');
	    
	    form.addButton('custombutton_back', 'Back', 'window.history.back()');
	    
	    response.writePage(form);
	};
		
	return {
		handleGet: handleGet,
		handlePost: handlePost	
		};
})();
