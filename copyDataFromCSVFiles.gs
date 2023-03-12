function copyDataFromCSVFiles() {
  // コピー元のフォルダーIDを指定
  var folderID = "フォルダーのIDを入力";

  // コピー元のフォルダーを取得
  var folder = DriveApp.getFolderById(folderID);

  // フォルダー内のCSVファイルを取得
  var files = folder.getFilesByType(MimeType.CSV);

  // アクティブなシートを取得
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // ファイルごとに処理を行う
  while (files.hasNext()) {
    var file = files.next();
    var csvData = file.getBlob().getDataAsString();
    var csvRows = Utilities.parseCsv(csvData);

    // シート1のA1:A500を取得し、アクティブなシートの次の空き列にコピー＆ペーストする
    var lastColumn = activeSheet.getLastColumn();
    for (var i = 0; i < csvRows.length && i < 500; i++) {
      activeSheet.getRange(i + 1, lastColumn + 1).setValue(csvRows[i][0]);
    }
  }
}
