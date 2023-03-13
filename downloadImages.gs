function downloadImages() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var urls = sheet.getRange("A1:A10").getValues();
  var folder = DriveApp.getFolderById("FolderID"); // ダウンロードする画像の保存先フォルダIDを指定

  for (var i = 0; i < urls.length; i++) {
    var url = urls[i][0];
    if (url !== "") {
      var blob = UrlFetchApp.fetch(url).getBlob();
      var file = folder.createFile(blob);
      var fileName = url.substring(url.lastIndexOf('/') + 1);
      file.setName(fileName);
    }
  }
}
