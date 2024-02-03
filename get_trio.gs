var array_trio=[];
function get_trio(post) {
  t_param =  post;
  // レースを選択
  var content2 = getResponse(t_param);
  var tableList = Parser.data(content2).from("<table").to("</table>").iterate();

  for(var i = 0;i < tableList.length; i++){
    //一番最後は合計部分のため、lengthより1少ない
    var odds_caption = Parser.data(tableList[i]).from("<caption>").to("</caption>").build();
    var odds_rows = Parser.data(tableList[i]).from('<th scope="row">').to("</th>").iterate();
    var odds_values = Parser.data(tableList[i]).from('<td').to("</td>").iterate();
    console.log(odds_values)
    for(var j = 0;j < odds_rows.length; j++){
      if(odds_values[j].indexOf('cancel')>0){
        odds_values[j]='取消';
      }else{
        odds_values[j] = odds_values[j].replace('>','');
        odds_values[j] = odds_values[j].replace(' class="zero"','');
        odds_values[j] = odds_values[j].replace('<strong class="red">','').replace('</strong>','');
      }
        array_trio.push({"first":odds_caption.split("-")[0],"second":odds_caption.split("-")[1],"third":odds_rows[j],"odds":odds_values[j]});

    }
  }
  console.log(array_trio);
}
