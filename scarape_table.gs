function fetchDataAndPopulateSheet() {
  var url = 'https://www.fda.gov/drugs/guidances-drugs/newly-added-guidance-documents';
  var response = UrlFetchApp.fetch(url);
  var content = response.getContentText();
  
  // Parse HTML content using regex to extract table data
  var tableData = extractTableData(content);
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear(); // Clear existing data
  
  // Populate the active sheet with data
  for (var i = 0; i < tableData.length; i++) {
    sheet.getRange(i + 1, 1, 1, tableData[i].length).setValues([tableData[i]]);
  }
}

function extractTableData(htmlContent) {
  // Use regex to extract table data from HTML
  var tableRegex = /<table[^>]*>[\s\S]*?<\/table>/g;
  var rowRegex = /<tr[^>]*>[\s\S]*?<\/tr>/g;
  var cellRegex = /<t[hd][^>]*>[\s\S]*?<\/t[hd]>/g;
  
  var tableMatches = htmlContent.match(tableRegex);
  if (!tableMatches || tableMatches.length === 0) {
    return [];
  }
  
  var tableData = [];
  tableMatches.forEach(function(tableMatch) {
    var rows = tableMatch.match(rowRegex);
    if (rows && rows.length > 0) {
      var rowData = [];
      rows.forEach(function(row) {
        var cells = row.match(cellRegex);
        if (cells && cells.length > 0) {
          var cellData = cells.map(function(cell) {
            return cell.replace(/<[^>]*>/g, ''); // Remove HTML tags
          });
          rowData.push(cellData);
        }
      });
      if (rowData.length > 0) {
        tableData = tableData.concat(rowData);
      }
    }
  });
  
  return tableData;
}
