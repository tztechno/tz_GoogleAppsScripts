function setZeros() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange("A1:A100").setValue(0);
}
