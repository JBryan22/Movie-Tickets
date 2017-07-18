//Business Logic

function Ticket(movie, time, age, isNew) {
  this.movie = movie;
  this.time = time;
  this.price = parseInt(getTicketPrice(isNew, time, age));
  var screenNumber;
  if (isNew) {
    screenNumber = Math.ceil(Math.random() * 3);
  } else {
    screenNumber = Math.ceil((Math.random() * 9) + 3);
  }
  this.screen = screenNumber;
}

Ticket.prototype.getShoppingCartInfo = function() {
  return this.movie + ' $' + this.price;
}

Ticket.prototype.getFullInfo = function(){
  return this.movie + ' in theater' + this.screen + ' at ' + this.time + '. Paid: $' + this.price;
}

function getTicketPrice(isNew, time, age) {
  var price = 15;
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

var ticketPrices = [];

//UI Logic

$(function(){
  $(".movie-form").submit(function(event){
    event.preventDefault();
    var inputtedMovie = $("#movie").val();
    var inputtedTime = $("#time").val();
    var inputtedAge = $("#age").val();
    var inputtedIsNew = $("#movie option:selected").hasClass('new');
    var total = 0;

    var newTicket = new Ticket(inputtedMovie, inputtedTime, inputtedAge, inputtedIsNew);
    total += newTicket.price
    // ticketPrices.push(newTicket.getPrice());

    $('.ticket-display-list ul').append('<li><span class="cartItem">' + newTicket.getShoppingCartInfo() + '</span><span class="removeItem"> Remove from cart</span></li>');
    $('.price').text(total);

    $(".ticket-display-list").show();
    $(".price-total").show();

    $(".cartItem").last().click(function(){
      $(".ticket-full-display h3").text(newTicket.movie);
      $(".full-display-time").text(newTicket.time);
      $(".full-display-screen").text(newTicket.screen);
      $(".full-display-price").text(newTicket.price);
      $(".ticket-full-display").show();
    });
    $(".removeItem").last().click(function(){
      this.parentNode.remove();
      total -= this.previousSibling
      $('.price').text(total);
    })
  });
  $(".purchase").submit(function(event){

  });
});
