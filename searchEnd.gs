function searchEnd(content, begin)
{
  var end = begin;
  var list = [];
  var offset = begin;
  while (true)
  {
    var res = getTag(content, offset);
    if (res.begin < 0) break;
    offset = res.end;

    if (res.isSingle) continue;
    if (res.isComment) continue;

    if (res.isClose)
    {
      while (list.length > 0)
      {
        var name = list.shift();
        if (name == res.name) break;
      }
    }
    else
    {
      list.unshift(res.name);
    }

    if (list.length <= 0)
    {
      end = offset;
      break;
    }
  }
  return end;
}
