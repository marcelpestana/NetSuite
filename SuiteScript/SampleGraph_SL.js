/**
 * Sample Graph for NetSuite
 * 
 * Version    Date            Author           Remarks
 * 1.00       07 Apr 2015     Marcel Pestana   Initial Version
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 */
function suitelet(request, response) {
	
	displayGraph();
}

function displayGraph() {
	
	var html,
		form,
		field;
	
	// Graph script files
	html = '<script type="text/javascript" src="https://code.highcharts.com/3.0.9/highcharts.js"></script>' 
		 + '<script type="text/javascript" src="https://code.highcharts.com/3.0.9/modules/exporting.js"></script>';

	// Container for the graph
	html += '<div id="container" style="width:400px; height:400px;"></div>';
	
	// JavaScript to load the graph
	html += '<script>NS.jQuery(document).ready(function(){'
		  + '	    NS.jQuery("#container").highcharts({'
		  + '	        credits: {'
		  + '            enabled: false'
		  + '           },'
		  + '	        chart: {'
		  + '            type: "bar"'
		  + '	        },'
		  + '	        title: {'
		  + '	            text: "Fruit Consumption"'
		  + '	        },'
		  + '	        xAxis: {'
		  + '	            categories: ["Apples", "Bananas", "Oranges"]'
		  + '	        },'
		  + '	        yAxis: {'
		  + '	            title: {'
		  + '	                text: "Fruit eaten"'
		  + '	            }'
		  + '	        },'
		  + '	        series: [{'
		  + '	            name: "Jane",'
		  + '	            data: [1, 0, 4]'
		  + '	        }, {'
		  + '	            name: "John",'
		  + '	            data: [5, 7, 3]'
		  + '	        }]'
		  + '	    });'
		  + '	});</script>';

	// Create a NetSuite form
	form = nlapiCreateForm('Graph Test', false);

	// Add a new HTML field to display the HTML contents
	field = form.addField('file', 'inlinehtml', 'label');
	field.setLayoutType('outsidebelow');
	field.setDefaultValue(html);

	response.writePage(form);
}
