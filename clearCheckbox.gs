function clearCheckbox() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getDataRange(); // シートの全範囲を取得
  var values = range.getValues(); // 範囲内の値を取得
  
  for (var i = 0; i < values.length; i++) {
    for (var j = 0; j < values[i].length; j++) {
      if (typeof values[i][j] === "boolean") { // チェックボックスの場合
        range.getCell(i+1, j+1).setValue(false); // チェックを外す
      }
    }
  }
}
