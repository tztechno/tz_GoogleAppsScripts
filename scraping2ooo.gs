function scraping() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var sht = sheet.getSheetByName('sheet1');
  var links = [];
     
  var getUrl = "https://connpass.com/ranking/";
  var content = UrlFetchApp.fetch(getUrl).getContentText('UTF-8');
  var itemRegexp = new RegExp(/https:\/\/[^\s'"]+/g);
  var blogUrlArray = content.match(itemRegexp);

  if (blogUrlArray) {
    for (var j = 0; j < blogUrlArray.length; j++) {
      Logger.log(blogUrlArray[j]);
      links.push([blogUrlArray[j]]);
    }

    // Move the setValues inside the if block
    sht.getRange(2, 2, links.length, 1).setValues(links);
  } else {
    Logger.log("No URLs found on the page.");
  }
}
