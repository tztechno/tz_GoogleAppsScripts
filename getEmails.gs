
function getEmails() {
  var query = "from:example@example.com"; // Specify sender's email address
  var threads = GmailApp.search(query);
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
  sheet.appendRow(["From", "Subject", "Date", "Message"]);
  for (var i = 0; i < threads.length; i++) {
    var message = threads[i].getMessages()[0];
    sheet.appendRow([message.getFrom(), message.getSubject(), message.getDate(), message.getPlainBody()]);
  }
}
