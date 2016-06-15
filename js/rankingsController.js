rankingsTable.controller('rankingsController', [function() {

  var self = this

  self.rankingsData = [
                        { "team": { "name": "Australia", "id": 32 }, "pos": 1, "pts": 54.23 },
                        { "team": { "name": "New Zealand", "id": 62 }, "pos": 2, "pts": 54.00 },
                        { "team": { "name": "France", "id": 2 }, "pos": 3, "pts": 52.95 },
                        { "team": { "name": "England", "id": 1 }, "pos": 4, "pts": 52.32 },
                        { "team": { "name": "Romania", "id": 24 }, "pos": 5, "pts": 43.50 }
                      ]

  self.allMatches = []

  self.findTeam = function(teamName) {
    for(var i=0; i<self.rankingsData.length; i++) {
      if(self.rankingsData[i].team.name === teamName) {
        return self.rankingsData[i]
      }
    }
  }

  self.pointDifference = function(homeTeamPoints, awayTeamPoints) {
      return parseFloat(((homeTeamPoints + 3) - awayTeamPoints).toFixed(2))
  }

  self.createMatch = function(index, homeTeam, awayTeam) {
    var index = index
    var homeTeam = self.findTeam(homeTeam)
    var awayTeam = self.findTeam(awayTeam)
    var homeTeamID = homeTeam.team.id
    var homeTeamName = homeTeam.team.name
    var homeTeamAbbreviation = homeTeam.team.name.substring(0,3).toUpperCase()
    var awayTeamID = awayTeam.team.id
    var awayTeamName = awayTeam.team.name
    var awayTeamAbbreviation = awayTeam.team.name.substring(0,3).toUpperCase()
    var match = new Match(index, homeTeamID, homeTeamName, homeTeamAbbreviation, awayTeamID, awayTeamName, awayTeamAbbreviation)
    return match
  }

  self.createMatches = function() {
    var matchCombinations = new createCombinations(self.rankingsData)
    for(var i=0; i<matchCombinations.length; i++) {
      self.allMatches.push(self.createMatch(i, matchCombinations[i][0].team.name, matchCombinations[i][1].team.name))
    }
    return self.allMatches
  }

  self.checkWinner = function(scoreArray) {
    if(scoreArray[0] > scoreArray[1]) {
      return "A"
    } else if (scoreArray[0] < scoreArray[1]) {
      return "B"
    } else if (!scoreArray[0] && !scoreArray[1]) {
      return "N"
    } else if (scoreArray[0] === scoreArray[1]){
      return "D"
    }
  }



}])
