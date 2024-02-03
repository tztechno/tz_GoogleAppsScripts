function getOdds() {  
var ss = SpreadsheetApp.getActive();
var sh = ss.getSheetByName('オッズ取得1日');
var input = sh.getRange('A1').getValue();
// データセット用変数
var set_row = 2
var set_column = 2

if ( typeof(input) != "String" ){
  input = String(input)
} 
var year = input.substr(0, 4);
var month = input.substr(4, 2);
var date = input.substr(6, 2); 

if (month != '10') month = month.replace('0', '');
if (date != '10' && date != '20' && date != '30') date = date.replace('0', '');
var target = month + '月' + date + '日';

  var lastCol = sh.getMaxColumns();
  sh.getRange("B:F").clearContent();
  //ループ処理用変数を定義
  let i = 0;
  let j = 0;
  let race = 0;
  

  // 「オッズを開く」
  var content = getResponse('pw15oli00/6D');
  var panel = content.match(/\<h3\sclass=\"sub_header\"\>(.*[\s\S].*){20}/g);
  if(!panel){
  //　「レース結果」を開く
    var content = getResponse('pw01sli00/AF');
    var panel = content.match(/\<h3\sclass=\"sub_header\"\>(.*[\s\S].*){20}/g);
  }
  var t_panel;
  for (i = 0; i < panel.length - 1; i++) {
    if (panel[i].indexOf(target) > 0) {
      t_panel = panel[i];
      break;
    }
  }

  var param = t_panel.match(/onclick=\"return\sdoAction\('.+/g);
  var t_param;

  for (i = 0; i < param.length; i++) {
    t_param = param[i].match(/\(\'.+\'\)/);
    t_param = t_param[0].match(/,\s'.+/);
    t_param = t_param[0].substr(3, t_param[0].length - 5);   

    // 開催地を格納
    place = param[i].match(/札幌|函館|福島|新潟|東京|中山|中京|京都|阪神|小倉/);

    // 開催地を選択
    var content = getResponse(t_param);
    var race_num = content.match(/class="race_num\"[\s\S].+/g);

    for (race = 0; race < race_num.length - 1; race++) {
      t_param = race_num[race + 1].match(/\(\'.+\'\)/);
      if(!!t_param){
        console.log(t_param)
        t_param = t_param[0].match(/,\s'.+/);
        console.log(t_param)
        t_param = t_param[0].substr(3, t_param[0].length - 5);  
        console.log(t_param)
        // レースを選択
        var content2 = getResponse(t_param);
      }else{
        var pastOdds = '//*[@id="race_list"]/tbody/tr['+race+']/td[6]';                       // pastOdds
        var result = searchXPath(content, [pastOdds]);
        const regex = /\'(.+?)\'/;
        result[0] = regex.exec(result[0].split(',')[1])[1];
        console.log(result);
        var content2 = getResponse(result[0]);
      }

      var horse = content2.match(/class="horse\"[\s\S].+/g);
      var adds_tan = content2.match(/class="odds_tan\"[\s\S].+<\/td>|class="odds_tan cancel\"[\s\S].+<\/td>/g);
      var adds_huku = content2.match(/class="odds_fuku\"[\s\S].+<\/td>|class="odds_fuku cancel\"[\s\S].+<\/td>/g);

      // カラムを設定
      sh.getRange(set_row, set_column).setValue(place + (race + 1) + 'R');
      sh.getRange(set_row, set_column + 1).setValue('馬番');
      sh.getRange(set_row, set_column + 2).setValue('馬名');
      sh.getRange(set_row, set_column + 3).setValue('単勝オッズ');
      sh.getRange(set_row, set_column + 4).setValue('複勝オッズ');

      for (j = 0; j < horse.length - 1; j++) {      
        var value_horse = horse[j + 1].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
        value_horse = value_horse.replace(/class="horse">/, '');
        
        var value_tan = adds_tan[j].slice(0,adds_tan[j].indexOf('</td>'));
        value_tan = value_tan.replace(/class="horse">/, '');
        value_tan = value_tan.replace(/class="odds_tan">/, '');
        value_tan = value_tan.replace(/<strong class="red">/, '');
        value_tan = value_tan.replace(/<\/strong>/, ''); 
        value_tan = value_tan.replace(/class="odds_tan cancel">/, ''); 

        var value_huku = adds_huku[j].slice(0,adds_huku[j].indexOf('</td>'));
        if(value_huku.includes("cancel")){
          value_huku = "取消";
        }else{
        value_huku = value_huku.split('<span class="min">')[1].split("</span>")[0];
        }

        sh.getRange(set_row + j + 1, set_column + 1).setValue(j + 1);
        sh.getRange(set_row + j + 1, set_column + 2).setValue(value_horse);
        sh.getRange(set_row + j + 1, set_column + 3).setValue(value_tan);   
        sh.getRange(set_row + j + 1, set_column + 4).setValue(value_huku);   
      }
      set_row = set_row + 20
    }
  }  
}
