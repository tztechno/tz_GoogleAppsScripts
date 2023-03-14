function onEdit(e) {
  var row = e.range.getRow();
  var column = e.range.getColumn();
  var sheet = e.range.getSheet();
  var value = e.range.getValue();
  
  if (column === 1) { // バーコードの読み込み列の番号に変更してください
    sheet.getRange(row, column + 1).setValue(value); // 結果を挿入する列の番号に変更してください
  }
}
