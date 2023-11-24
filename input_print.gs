
function inputDataToGoogleSheet() {
  // ユーザーからの入力を取得
  var N = parseInt(prompt("Enter N:"));
  var A = prompt("Enter A (space-separated):").split(' ').map(Number);

  // Google Sheetsのアクティブなスプレッドシートを取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Nをシートに書き込む
  sheet.getRange(1, 1).setValue(N);

  // Aをシートに書き込む
  for (var i = 0; i < A.length; i++) {
    sheet.getRange(2, i + 1).setValue(A[i]);
  }
}

