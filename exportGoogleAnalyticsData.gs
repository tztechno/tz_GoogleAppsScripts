// 動作未確認
function exportGoogleAnalyticsData() {
  // Google AnalyticsのView IDを設定します
  var viewId = 'XXXXXXXX'; // ここに自分のView IDを入力してください
  
  // データの開始日と終了日を設定します
  var startDate = '2022-01-01';
  var endDate = '2022-12-31';
  
  // Google Analytics APIにアクセスするための認証情報を設定します
  var keyFile = 'key.json'; // ここに認証情報のJSONファイル名を入力してください
  var key = JSON.parse(DriveApp.getFileById(keyFile).getBlob().getDataAsString());
  var jwt = new cGoa.Goa().jwt(key, ['https://www.googleapis.com/auth/analytics.readonly']);
  var service = jwt.getService();
  
  // Google Analytics Reporting API v4を初期化します
  var analytics = AnalyticsReporting.Reports.batchGet({
    "reportRequests": [
      {
        "viewId": viewId,
        "dateRanges": [
          {
            "startDate": startDate,
            "endDate": endDate
          }
        ],
        "metrics": [
          {
            "expression": "ga:sessions"
          },
          {
            "expression": "ga:pageviews"
          }
        ],
        "dimensions": [
          {
            "name": "ga:date"
          }
        ],
        "pageSize": 10000 // 取得する最大レコード数を設定します
      }
    ]
  });
  
  // レポートデータをCSVファイルに変換してGoogle Driveに保存します
  var data = analytics.reports[0].data.rows;
  var csv = '日付,セッション数,ページビュー数\n';
  for (var i = 0; i < data.length; i++) {
    csv += data[i].dimensions[0] + ',' + data[i].metrics[0].values[0] + ',' + data[i].metrics[0].values[1] + '\n';
  }
  var filename = 'ga_report_' + startDate + '_' + endDate + '.csv';
  var folder = DriveApp.getFolderById('XXXXXXXX'); // ここに保存するフォルダのIDを入力してください
  folder.createFile(filename, csv, MimeType.CSV);
}
