function printColumnA() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var range = sheet.getRange("A1:A");
  range.activate();
  sheet.setActiveRange(range);
  var printSheet = ss.getPrintArea(sheet.getName());
  printSheet.print();
}
