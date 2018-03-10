/**
 * Transaction - Client Script to set the sublist line number in a custom field
 * 
 * Version    Date            Author           Remarks
 * 1.00       03 Jun 2015     Marcel Pestana   Initial Version
 * 1.1		  16 Jul 2015	  Marcel Pestana   Fixes
 *
 */

/**
 * Transaction - Page Init
 * 
 * @param {String} type Access mode
 * @returns {Void}
 */
function lineNumInit(type) {
   
	if (type == 'edit') {
		
		if (nlapiGetLineItemCount('item') > 0 && 
			nlapiGetLineItemValue('item', 'custcol_line_number', 1) == '') {
	
			// Load line numbers on Page Init
			setLineNumbers()
		}
	}
}

/**
 * Transaction - Line Init
 *   
 * @param {String} type Sublist internal id
 * @returns {Void}
 */
function lineNumLineInit(type) {
	
	var index;
	
	// On line init of the Item sublist, gets the current line index and set into the custom field
	if (type == 'item') {
		
		index = nlapiGetCurrentLineItemIndex(type);
	
		nlapiSetCurrentLineItemValue(type, 'custcol_line_number', index);
	}
}

/**
 * Transaction - Recalc
 * 
 * @param {String} type Sublist internal id
 * @returns {Void}
 */
function lineNumRecalc(type) {
	
	// When adding or deleting a line of the Item sublist, it will refresh the line numbers
	if (type == 'item') {
		
		setLineNumbers();
	}	
}

/**
 * Set Line Numbers field
 * 
 * @returns {Void}
 */
function setLineNumbers() {
	
	var itemsCount = nlapiGetLineItemCount('item'),
		i = 0;
		
	// Set the Line Number transaction column. This field is disabled to the user
	for (i = 1; i <= itemsCount; i++ ) {
		
		nlapiSetLineItemValue('item', 'custcol_line_number', i, i);
	}
}
