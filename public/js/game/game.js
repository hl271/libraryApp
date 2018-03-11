var fullCardsList = []
var selectedCardsList = []
var totalMoney = 0
var counter = 0
var stopPoint = 6
var bountyCardsRawList = [
  {
    url: '/img/game/chopper.jpg',
    bounty: 100
  },
  {
    url: '/img/game/cyborg.jpg',
    bounty: 94000000
  },
  {
    url: '/img/game/luffy.jpg',
    bounty: 500000000
  },
  {
    url: '/img/game/nami.png',
    bounty: 66000000
  },
  {
    url: '/img/game/robin.png',
    bounty: 130000000
  },
  {
    url: 'img/game/sanji.jpg',
    bounty: 177000000
  },
  {
    url: '/img/game/usopp.jpg',
    bounty: 200000000
  },
  {
    url: '/img/game/zoro.jpg',
    bounty: 320000000
  }
]
var CardItem = function (id, url, prize, bounty) {
  this.id = id
  this.url = url
  this.prize = prize
  this.bounty = bounty
}
$(document).ready(newGame)

function newGame () {
  counter = 0
  selectedCardsList = []
  totalMoney = 0
  $('.txt--total-money').text(totalMoney)
  $('.btn--locker').prop('disabled', false)
  $('.btn--result').addClass('disabled')
  $('.btn--purchase').prop('disabled', true)
  $('.result-card').remove()
  fullCardsList = createFullCardsList(8, 24)
}

function createPrizeIds (prizeCards, totalCards) {
  var prizeIds = []
  for (var i = 0; i < prizeCards; i++) {
    var id = Math.round(Math.random() * (totalCards - 1))
    while (prizeIds.indexOf(id) !== -1) { id = Math.round(Math.random() * (totalCards - 1)) }
    prizeIds.push(id)
  }
  return prizeIds
}

function createUnluckyCards (prizeIds, totalCards) {
  var unluckyCards = []
  var unluckyIds = []
  for (var i = 0; i < totalCards; i++) {
    if (prizeIds.indexOf(i) === -1) { unluckyIds.push(i) }
  }
  unluckyIds.forEach(function (id) {
    var unluckyCard = new CardItem(id, '/img/game/good-luck.jpg', false, 0)
    unluckyCards.push(unluckyCard)
  })
  return unluckyCards
}

function createPrizeCards (prizeIds) {
  var prizeCardsList = []
  prizeIds.forEach(function (id) {
    var randomIndex = Math.round(Math.random() * (bountyCardsRawList.length - 1))
    var randomBountyCard = bountyCardsRawList[randomIndex]
    var prizeCardItem = new CardItem(id, randomBountyCard.url, true, randomBountyCard.bounty)
    prizeCardsList.push(prizeCardItem)
  })
  return prizeCardsList
}
//  function createPrizeCardsList (prizeCards, totalCards) {
//    var ids = []
//    var prizeCardsList = []
//    for (var i=0; i<prizeCards ; i++) {
//      var id = Math.round(Math.random()*totalCards);
//      while (ids.indexOf(id) !== -1) {id= Math.round(Math.random()*totalCards)}
//      ids.push(id)
//      //Create cards
//      var prizeCardItem = new CardItem(id, '/img/game/chest.ico', true )
//      prizeCardsList.push(prizeCardItem)
//    }
//    return prizeCardsList
//  }
function createFullCardsList (prizeCards, totalCards) {
  var prizeIds = createPrizeIds(prizeCards, totalCards)
  var bountyCardsList = createPrizeCards(prizeIds)
  var unluckyCardsList = createUnluckyCards(prizeIds, totalCards)
  var fullCardsList = []
  bountyCardsList.forEach(function (bountyCard) {
    fullCardsList[bountyCard.id] = bountyCard
  })
  unluckyCardsList.forEach(function (unluckyCard) {
    fullCardsList[unluckyCard.id] = unluckyCard
  })
  return fullCardsList
}

$('.btn--start-game').on('click', newGame)
$('.btn--restart').on('click', newGame)
$('.btn--locker').on('click', function () {
  for (var i = 0; i < 30; i++) {
    if ($(this).hasClass(i + 1)) {
      selectedCardsList.push(fullCardsList[i])
      //          $('.panel--display').append('<div class="col-3"><div class="card"><img src="'+fullCardsList[i].url +'" class="img-fluid"/></div></div>')
      $(this).parent().parent().append('<img class="result-card" src="' + fullCardsList[i].url + '">')
      totalMoney += fullCardsList[i].bounty
      $('.txt--total-money').text(totalMoney).formatCurrency()
    }
  }
  counter++
  $(this).prop('disabled', true)
  if (counter === stopPoint) {
    $('.btn--result').removeClass('disabled')
    $('.btn--locker').prop('disabled', true)
    $('.btn--purchase').prop('disabled', false)
  }
})

$('.btn--purchase.book').on('click', function() {
  if (totalMoney >= 100000000) {totalMoney -= 100000000}
  $('.txt--total-money').text(totalMoney).formatCurrency()
})
$('.btn--purchase.music').on('click', function() {
  if (totalMoney >= 200000000) {totalMoney -= 200000000}
  $('.txt--total-money').text(totalMoney).formatCurrency()

})
$('.btn--purchase.movie').on('click', function() {
  if (totalMoney >= 300000000) {totalMoney -= 300000000}
  $('.txt--total-money').text(totalMoney).formatCurrency()
})

