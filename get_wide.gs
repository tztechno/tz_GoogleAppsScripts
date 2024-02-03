var array_wide=[];
function get_wide(post) {
  t_param =  post;
  // レースを選択
  var content2 = getResponse(t_param);
  var tableList = Parser.data(content2).from("<table").to("</table>").iterate();

  for(var i = 0;i < tableList.length; i++){
    //一番最後は合計部分のため、lengthより1少ない
    var odds_caption = Parser.data(tableList[i]).from("<caption>").to("</caption>").build();
    var odds_rows = Parser.data(tableList[i]).from('<th scope="row">').to("</th>").iterate();
    var odds_values = Parser.data(tableList[i]).from('<td').to("</td>").iterate();//minのみ取得


    for(var j = 0;j < odds_rows.length; j++){
      if(odds_values[j].indexOf('cancel')>0){
        odds_values[j]='取消';
      }else{
        odds_values[j] = odds_values[j].split('<span class="cap">')[0];
        odds_values[j] = odds_values[j].replace(' class="odds">','');
        odds_values[j] = odds_values[j].replace('<span class="inner">','');
        odds_values[j] = odds_values[j].replace('<span class="min">','').replace('</span>','');
        odds_values[j] = odds_values[j].replace('<strong class="red">','').replace('</strong>','');
        

        
      }
      array_wide.push({"first":odds_caption,"second":odds_rows[j],"odds":odds_values[j]});

    }
    console.log(odds_values)


  }
  console.log(array_wide);
}
