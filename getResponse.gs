function getResponse(post) {
  var payload = { 'cname': post }; 
  var options = { 'method' : 'post', 'payload' : payload };
  var response = UrlFetchApp.fetch('https://jra.jp/JRADB/accessO.html', options);
  var content = response.getContentText("SJIS");
  Utilities.sleep(1000);
  return content;
}
