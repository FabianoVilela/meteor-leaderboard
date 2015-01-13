// Boths
PlayersList = new Mongo.Collection('players');

// Client
if (Meteor.isClient) {

  // Helpers
  Template.leaderboard.helpers({
   'player': function() {
      return PlayersList.find({}, {sort: {score: -1, name: 1}});
    },
    'selectedClass': function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return "selected";
      };
    },
    'showSelectedPlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    }

  });

  // Events
  Template.leaderboard.events({
    'click .player': function() {
      Session.set('selectedPlayer', this._id);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5}});
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5}});
    },
    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove(selectedPlayer);
    }
  });

  Template.addPlayerForm.events({
    'submit form': function () {
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      PlayersList.insert({name: playerNameVar, score: 0});
    }
  });
};

// Server

if (Meteor.isServer) {
  //console.log("Hello Server");
};