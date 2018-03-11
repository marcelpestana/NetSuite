/**
 * User Event Script - Count the number of line items on Transactions
 *  
 * Version    Date            Author           Remarks
 * 1.0        05 Mar 2015     Marcel Pestana   Initial Version
 *
 */

/**
 * @appliedtorecord Sales Order, Purchase Order
 *   
 * @param {String} type Operation types
 * 
 * @returns {Void}
 */
function beforeSubmit(type) {
	
	if (type == 'create' || type == 'edit') {
		
		getLineItemCount();		
	}	
}

/**
 * Count the number of line items in Transactions
 * 
 * @returns {Void}
 */
function getLineItemCount()
{
	var itemsCount = nlapiGetLineItemCount('item');
	
	// For Purchase Orders and Sales Orders, set count of lines into the custom field
	nlapiSetFieldValue('custbody_items_count', itemsCount);	
}
