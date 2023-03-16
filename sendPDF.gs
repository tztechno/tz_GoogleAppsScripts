//送信まで行う
function sendPDF() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var pdf = sheet.getAs('application/pdf').setName(sheet.getName() + '.pdf');
  var recipient = 'recipient@example.com'; // 宛先のメールアドレスを指定する
  var subject = sheet.getName(); // シート名をタイトルに使用する
  
  var message = {
    to: recipient,
    subject: subject,
    attachments: [pdf]
  };
  
  GmailApp.sendEmail(recipient, subject, '', {attachments:[pdf]});
}

//ドラフト作成まで、送信は手動
function sendPDF() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var pdf = sheet.getAs('application/pdf').setName(sheet.getName() + '.pdf');
  var recipient = 'recipient@example.com'; // 宛先のメールアドレスを指定する
  var subject = sheet.getName(); // シート名をタイトルに使用する
  
  var message = {
    to: recipient,
    subject: subject,
    attachments: [pdf]
  };
  
  var draft = GmailApp.createDraft(recipient, subject, '', {attachments:[pdf]});
  Logger.log('Draft URL: ' + draft.getMessage().getPermalink());
}
