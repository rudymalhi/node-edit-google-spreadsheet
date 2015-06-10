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
		spreadsheetId: '1EdkGbCHyUrm2Ge1lW0nTgu5shNCKVNCyNWhpGuYfSkg',
		worksheetName: 'Lookup Data',
		createWorksheet: true,
		oauth: authClient,
		debug: true		
	}, function sheetReady(err, spreadsheet) {
		if (err) {
			return console.log(err);
		}
		spreadsheet.addRow({name: "test 1", "2015/01": 1, col2: 2, col3: 3}, function(err, result) {
			if (err) {
				return console.error('Cannot add row', err);
			}
			console.log('Row added', result.entry.content);
			spreadsheet.addRow({name: "test 2", "2015/01": 2, col2: 4, col3: 6}, function(err, result) {
				if (err) {
					return console.error('Cannot add row', err);
				}
				console.log('Row added', result.entry.content);

				// try to update the "test 1" row
				spreadsheet.getRows({name: "test 1"}, function(err, rows) {
					if (err) {
						return console.error('Cannot get rows ', err);
					}
					var firstRow = rows[0];
					firstRow.raw["gsx:col1"] = {"$t" : 5};
					spreadsheet.updateRow(firstRow, function(err) {
						if (err) {
							return console.error('Cannot update row ', err);
						}
						console.log('Done');
					});
				});
			});
		});
	}
);