function downloadAsCSV() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  var values = sheet.getDataRange().getValues();
  var csvContent = "";
  for (var row = 0; row < values.length; row++) {
    for (var col = 0; col < values[row].length; col++) {
      var cellValue = values[row][col];
      if (cellValue != null) {
        cellValue = cellValue.toString();
        if (cellValue.indexOf(",") != -1 || cellValue.indexOf("\n") != -1) {
          cellValue = "\"" + cellValue.replace(/"/g, "\"\"") + "\"";
        }
      }
      if (col < values[row].length - 1) {
        csvContent += cellValue + ",";
      } else {
        csvContent += cellValue + "\n";
      }
    }
  }
  var fileName = "data.csv";
  var mimeType = "text/csv";
  var content = Utilities.newBlob(csvContent, mimeType, fileName);
  DriveApp.createFile(fileName, csvContent, mimeType);
}
