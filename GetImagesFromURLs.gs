//動作未確認

function GetImagesFromURLs() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();

  for (var i = 0; i < data.length; i++) {
    var url = data[i][0];
    if (url !== "") {
      var blob = UrlFetchApp.fetch(url).getBlob();
      var image = sheet.insertImage(blob, i + 1, 2);
      var width = sheet.getRange(i + 1, 2).getWidth();
      var height = sheet.getRange(i + 1, 2).getHeight();
      image.setWidth(width).setHeight(height);
    }
  }
}
