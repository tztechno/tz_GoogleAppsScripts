function myFunction() {
  var input = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange("A1:B1").getValues()[0];
  var A = parseInt(input[0]);
  var B = parseInt(input[1]);
  
  var result = Math.pow(32, A - B);
  
  Logger.log(result);
}


このGASコードはGoogle Apps Scriptエディタで使用できます。
myFunctionはスプレッドシート上のセル A1 および B1 から入力を受け取り、計算結果をログに出力します。
これを適用する前に、Google Sheetsでスクリプトエディタを開き、このコードを新しい関数として貼り付ける必要があります。
