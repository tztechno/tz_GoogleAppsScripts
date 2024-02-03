function extractText(content)
{
  var offset = 0;
  var res = getTag(content, offset);
  if (res.begin < 0)
  {
    return content;
  }
  var begin = searchTag(content, res.name);
  var end = searchEnd(content, begin);
  var remove = content.slice(begin, end);
  return content.replace(remove, '');
}
