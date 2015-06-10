var authData = require('./auth-data'),
	google = require('googleapis'),
	Spreadsheet = require('../lib/spreadsheet'),
	Metadata = require('../lib/metadata');

var authClient = new google.auth.JWT(
    authData.email,
    null,
	authData.key,
    ['https://spreadsheets.google.com/feeds'],
    null);

Spreadsheet.load(
	{
		spreadsheetId: '1RHqDiuS3s2FG_wqURs18KgOH9Q28JAfu4VDG73OM-xg',
		worksheetName: 'Test 1',
		createWorksheet: true,
		oauth: authClient,
		debug: true		
	}, function sheetReady(err, spreadsheet) {
		if (err) {
			return console.log(err);
		}
		var meta = new Metadata(spreadsheet);
		meta.delete(function(err) {
			if (err) {
				return console.log(err);
			}
			console.log('Sheet deleted');
		});
	}
);