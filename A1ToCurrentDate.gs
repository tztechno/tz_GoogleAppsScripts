
function A1ToCurrentDate() {
  // 今日の日付を取得
  var today = new Date();
  var year = today.getFullYear().toString(); // 4桁の年
  var month = ("0" + (today.getMonth() + 1)).slice(-2); // 2桁の月
  var day = ("0" + today.getDate()).slice(-2); // 2桁の日

  // シート名を今日の日付に変更
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.setName(year + "-" + month + "-" + day);

  // A列の情報を全削除
  var lastRow = sheet.getLastRow();
  sheet.getRange("A1:A" + lastRow).clearContent();

  // A1セルの値を今日の日付に変更
  sheet.getRange("A1").setValue(year + "-" + month + "-" + day);
}

########################################################

function A1ToCurrentDate() {
  // 今日の日付を取得
  var today = new Date();
  var year = today.getFullYear().toString(); // 4桁の年
  var month = ("0" + (today.getMonth() + 1)).slice(-2); // 2桁の月
  var day = ("0" + today.getDate()).slice(-2); // 2桁の日

  // シート名を今日の日付に変更
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.setName(year + "-" + month + "-" + day);

  // A1セルの値を今日の日付に変更
  sheet.getRange("A1").setValue(year + "-" + month + "-" + day);
}
