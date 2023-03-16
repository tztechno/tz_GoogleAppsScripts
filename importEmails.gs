//操作未確認
function importEmails() {
  // スプレッドシートの情報を設定します
  var spreadsheetId = 'XXXXXXXXXXXXXXX'; // ここにスプレッドシートのIDを入力してください
  var sheetName = 'Sheet1'; // ここにシート名を入力してください
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  
  // Gmailの情報を設定します
  var searchQuery = 'subject:"特定の件名"'; // ここに検索クエリを入力してください
  var threads = GmailApp.search(searchQuery);
  
  // スプレッドシートにデータを書き込みます
  var data = [];
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var content = messages[j].getBody(); // メールの本文を取得します
      data.push([content]);
    }
  }
  sheet.getRange(2, 1, data.length, data[0].length).setValues(data);
}
