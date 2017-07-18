//Business Logic

function Ticket(movie, time, age, isNew) {
  this.movie = movie;
  this.time = time;
  this.price = getTicketPrice(isNew, time, age);
  var screenNumber;
  if (isNew) {
    screenNumber = Math.ceil(Math.random() * 3);
  } else {
    screenNumber = Math.ceil((Math.random() * 9) + 3);
  }
  this.screen = screenNumber;
}

Ticket.prototype.getFullInfo = function(){
  return this.movie + ' in theater' + this.screen + ' at ' + this.time + '. Paid: $' + this.price;
}

function getTicketPrice(isNew, time, age) {
  var price = 14;
  if (isMatinee(time)) {
    price -= 3;
  }
  if (!isNew) {
    price -= 2;
  }
  if (age < 11 || age > 65) {
    price -= 2;
  }
  return price;
}

function isMatinee(time) {
  if (time[time.length - 2] === 'a' || parseInt(time) < 4) {
    return true;
  } else {
    return false;
  }
}

//UI Logic

$(function(){
  $(".movie-form").submit(function(event){
    event.preventDefault();
    var inputtedMovie = $("#movie").val();
    var inputtedTime = $("#time").val();
    var inputtedAge = $("#age").val();
    var inputtedIsNew = $("#movie option:selected").hasClass('new');

    var newTicket = new Ticket(inputtedMovie, inputtedTime, inputtedAge, inputtedIsNew);
  });
});
