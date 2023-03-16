//動作未確認
function removeGuestsFromPastEvents() {
  var calendar = CalendarApp.getDefaultCalendar();
  var today = new Date();
  var yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));
  var events = calendar.getEvents(yesterday, today);

  for (var i = 0; i < events.length; i++) {
    var event = events[i];
    var start = event.getStartTime();
    var guests = event.getGuestList();

    // 前日までのイベントに追加されているゲストを全て削除
    if (start.getTime() <= yesterday.getTime()) {
      for (var j = 0; j < guests.length; j++) {
        var guest = guests[j];
        if (guest.getEmail() != calendar.getOwner().getEmail()) {
          event.removeGuest(guest);
        }
      }
    }
  }
}
