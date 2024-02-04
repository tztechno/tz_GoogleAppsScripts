function scraping() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var sht = sheet.getSheetByName('sheet1');
  var links = [];
     
  for (i=1; i<3; i++) {
    var getUrl = "http://at-jinji.jp/blog/all/page/" + i;
    var content = UrlFetchApp.fetch(getUrl).getContentText('UTF-8');
    var itemRegexp = new RegExp(/https:\/\/at-jinji.jp\/blog\/[0-9]+/g);
    var blogUrlArray = content.match(itemRegexp);
    for(j=0; j<blogUrlArray.length; j++) {
      links.push([blogUrlArray[j]]);
    }
  }
  
  sht.getRange(2, 2, links.length, 1).setValues(links);
  
}
