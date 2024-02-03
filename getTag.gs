function getTag(str, offset)
{
  var res = {};

  res.begin = str.indexOf('<', offset);
  res.end = str.indexOf('>', res.begin) + 1;
  res.tag = str.slice(res.begin, res.end);
  res.name = res.tag.replace('/','').replace('<','').replace('>','').split(' ')[0];
  res.isClose = res.tag.indexOf('</') >= 0;
  res.isComment = res.tag.indexOf('<!') >= 0;
  res.isSingle = res.tag.indexOf('/>') >= 0;

  return res;
}
