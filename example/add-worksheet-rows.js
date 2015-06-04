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
		spreadsheetId: '1z_H4G6McjztvuWgpq7nnfg3xcTHjFcud-p_X3Hefq7g',
		worksheetName: 'Lookup Data',
		createWorksheet: true,
		oauth: authClient,
		debug: true		
	}, function sheetReady(err, spreadsheet) {
		if (err) {
			return console.log(err);
		}
		spreadsheet.addRow({name: "test", col1: 1, col2: 2, col3: 3}, function(err, result) {
			if (err) {
				return console.error('Cannot add row', err);
			}
			console.log('Row added', result);
			spreadsheet.addRow({name: "test 2", col1: 2, col2: 4, col3: 6}, function(err, result) {
				if (err) {
					return console.error('Cannot add row', err);
				}
				console.log('Row added', result);
			});
		});
	}
);