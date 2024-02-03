function getResponse(post) {
  var payload = { 'cname': post }; 
  var options = { 'method' : 'post', 'payload' : payload };
  var response = UrlFetchApp.fetch('https://www.niid.go.jp/niid/ja/', options);
  var content = response.getContentText("SJIS");
  Utilities.sleep(1000);
  return content;
}

function writeToSheet(post) {
  var content = getResponse(post);
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('Sheet1');
  sheet.getRange(1, 1).setValue(content);
}
