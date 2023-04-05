function setRowWidthTo10() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastColumn = sheet.getLastColumn();
  sheet.setRowHeights(1, sheet.getMaxRows(), 20); // まずはすべての行の高さを20に設定
  for (var col = 1; col <= lastColumn; col++) {
    sheet.setColumnWidth(col, 10);
  }
}
