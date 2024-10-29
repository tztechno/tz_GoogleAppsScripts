function scrapeData() {
  const url = 'https://hojyokin-portal.jp/subsidies/list?pref_id=13&city_id=683&keywords=';
  const response = UrlFetchApp.fetch(url); // URLにアクセス
  const html = response.getContentText(); // HTMLを取得

  // スプレッドシートの準備
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sheet1');

  // 現在のタイトルを抽出
  const newTitles = extractTitles(html);
  
  // 既存のタイトルを取得
  const existingTitles = sheet.getRange('B:B').getValues().flat().filter(Boolean); // B列の値を取得し、空でない値のみフィルタリング
  
  // 新しいタイトルのうち、既存のタイトルにないものだけを抽出
  const titlesToAdd = newTitles.filter(title => !existingTitles.includes(title));
  
  // タイトルを縦に書き込むための二次元配列を作成
  const dataToWrite = titlesToAdd.map(title => [new Date(), title]); // 各タイトルに日時を追加
  
  // データをシートに書き込む（A列に日時、B列にタイトル）
  if (dataToWrite.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, dataToWrite.length, 2).setValues(dataToWrite); // 書き込む範囲を指定
  }
}

function extractTitles(html) {
  const regex = /<h4 class="c-subsidy__title">\s*(.*?)\s*<\/h4>/g; // 正規表現でh4タグを取得
  const titles = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    titles.push(match[1].trim()); // マッチしたテキストをトリムして配列に追加
  }

  return titles; // タイトルの配列を返す
}
