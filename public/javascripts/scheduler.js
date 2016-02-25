window.onload = function() {
  scheduler.init('scheduler_here', new Date(), "month");
  var events = [{
    id: 1,
    text: "Meeting",
    start_date: "02/24/2016 14:00",
    end_date: "02/24/2016 17:00",
    details: "the meeting is at Olin128"
  }, {
    id: 2,
    text: "Conference",
    start_date: "04/15/2013 12:00",
    end_date: "04/18/2013 19:00"
  }, {
    id: 3,
    text: "Interview",
    start_date: "04/24/2013 09:00",
    end_date: "04/24/2013 10:00"
  }];
  scheduler.parse(events, "json");//takes the name and format of the data source
}
