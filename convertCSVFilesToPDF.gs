function convertCSVFilesToPDF() {
  // コピー元のフォルダーIDを指定
  var folderID = "フォルダのIDを入力";

  // コピー元のフォルダーを取得
  var folder = DriveApp.getFolderById(folderID);

  // フォルダー内のCSVファイルを取得
  var files = folder.getFilesByType(MimeType.CSV);

  // PDFファイルを生成するためのオプションを設定
  var pdfOptions = {
    pageSize: "A4",
    printBackground: true
  };

  // 各CSVファイルをPDFに変換し、ファイルに保存する
  while (files.hasNext()) {
    var file = files.next();
    var csvData = file.getBlob().getDataAsString();
    var csvRows = Utilities.parseCsv(csvData);
    var spreadsheet = SpreadsheetApp.create(file.getName());
    var sheet = spreadsheet.getActiveSheet();
    for (var i = 0; i < csvRows.length && i < 500; i++) {
      sheet.getRange(i + 1, 1).setValue(csvRows[i][0]);
    }
    SpreadsheetApp.flush(); // ここを追加
    var pdfName = file.getName().replace(".csv", ".pdf");
    var pdfBlob = spreadsheet.getBlob().getAs('application/pdf').setName(pdfName); // ここを修正
    folder.createFile(pdfBlob);
    DriveApp.getFileById(spreadsheet.getId()).setTrashed(true);
  }
}
