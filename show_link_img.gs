
function generateHTMLFromImages() {
  // スプレッドシートとシートの取得
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const urls = sheet.getRange(1, 1, sheet.getLastRow()).getValues().flat();

  // HTML構造の初期化
  let htmlContent = `
  <html>
  <head>
      <style>
          .image-container {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 10px;
              padding: 10px;
          }
          .image-container img {
              width: 100%;
              height: auto;
              border: 1px solid #ccc;
              border-radius: 5px;
          }
      </style>
  </head>
  <body>
      <div class="image-container">
  `;

  // URLリストをループして画像を取得し、Base64エンコード
  urls.forEach(url => {
    if (url) {
      try {
        const response = UrlFetchApp.fetch(url);
        const imageBlob = response.getBlob();
        const base64String = Utilities.base64Encode(imageBlob.getBytes());
        htmlContent += `<img src="data:image/png;base64,${base64String}" alt="Image"/>`;
      } catch (e) {
        Logger.log(`Failed to fetch image from URL: ${url}. Error: ${e.message}`);
      }
    }
  });

  // HTMLの終了部分
  htmlContent += `
      </div>
  </body>
  </html>
  `;

  // HTMLをドライブに保存
  const fileName = "anime_images.html";
  const file = DriveApp.createFile(fileName, htmlContent, MimeType.HTML);
  
  Logger.log(`HTML file created: ${file.getUrl()}`);
}
