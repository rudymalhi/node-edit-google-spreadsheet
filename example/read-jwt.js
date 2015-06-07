var authData = require('./auth-data'),
	google = require('googleapis'),
	Spreadsheet = require('../lib/spreadsheet');

var authClient = new google.auth.JWT(
    authData.email,
    null,
	authData.key,
    ['https://spreadsheets.google.com/feeds'],
    null);

Spreadsheet.load(
	{
		spreadsheetId: '1rlzb8W8bgJUlDxmUNQwhQgyjsgxV5SmToGrZ46c5UYQ',
		worksheetId: 1,
		oauth: authClient,
		debug: true		
	}, function sheetReady(err, spreadsheet) {
		if (err) {
			return console.log(err);
		}
		spreadsheet.receive({getValues:false},function(err, rows, info) {
		    if(err) throw err;
		    console.log("Found rows:", rows);
		});
	}
);