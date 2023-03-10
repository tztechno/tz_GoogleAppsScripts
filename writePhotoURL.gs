function writePhotoURL() {
  var folderId = "FolderID"; // フォルダのIDを指定してください
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFilesByType("image/png"); // 画像ファイルの場合、MimeTypeを指定してください
  var sheet = SpreadsheetApp.getActiveSheet(); // アクティブなスプレッドシートを取得
  var row = 1; // URLを書き込む行
  sheet.getRange("A1").setValue("Photo URL"); // タイトル行を追加
  while (files.hasNext()) {
    var file = files.next();
    var fileUrl = file.getUrl();
    sheet.getRange("A" + (row + 1)).setValue(fileUrl);
    row++;
  }
}
