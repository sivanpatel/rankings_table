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
  self.homeScore = []
  self.awayScore = []

  self.predictMatches = function() {
    for(var i=0; i<self.allMatches.length; i++) {
      if(self.homeScore[i] && self.awayScore[i]) {
        self.addLiveMatch(self.allMatches[i].teams[0].name, self.allMatches[i].teams[1].name, self.homeScore[i], self.awayScore[i])
      }
    }
    self.calculatePoints()
    self.updateRankings()
  }

  self.findTeam = function(teamName) {
    for(var i=0; i<self.rankingsData.length; i++) {
      if(self.rankingsData[i].team.name === teamName) {
        return self.rankingsData[i]
      }
    }
  }

  self.pointDifference = function(homeTeamPoints, awayTeamPoints) {
      var pointDifference = parseFloat(((homeTeamPoints + 3) - awayTeamPoints).toFixed(2))
      if(pointDifference<10 && pointDifference>-10) {
        return pointDifference
      } else if(pointDifference <= -10) {
        return -10
      } else if(pointDifference >= 10){
        return 10
      }
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
    var matches = new createCombinations(self.rankingsData)
    var reversedMatches = new createCombinations(self.rankingsData)
    reversedMatches.forEach(function(match) {match.reverse()})
    var matchCombinations = matches.concat(reversedMatches)
    for(var i=0; i<matchCombinations.length; i++) {
      self.allMatches.push(self.createMatch(i, matchCombinations[i][0].team.name, matchCombinations[i][1].team.name))
    }
    return self.shuffleMatches(self.allMatches)
  }

  self.addLiveMatch = function(homeTeam, awayTeam, homeScore, awayScore) {
    for(var i=0; i<self.allMatches.length; i++) {
      if(self.allMatches[i].teams[0].name === homeTeam && self.allMatches[i].teams[1].name === awayTeam && self.allMatches[i].status !== "C") {
        self.allMatches[i].scores[0] = homeScore
        self.allMatches[i].scores[1] = awayScore
        self.allMatches[i].status = "L"
        self.allMatches[i].outcome = self.checkWinner(self.allMatches[i].scores)
      }
    }
  }

  self.calculatePoints = function() {
    for(var i=0; i<self.allMatches.length; i++) {
      if(self.allMatches[i].status === "L") {
        var homeIndex = self.rankingsData.indexOf(self.findTeam(self.allMatches[i].teams[0].name))
        var awayIndex = self.rankingsData.indexOf(self.findTeam(self.allMatches[i].teams[1].name))
        var pointDifference = self.pointDifference(self.rankingsData[homeIndex].pts, self.rankingsData[awayIndex].pts)/10
        self.addPoints(i, homeIndex, awayIndex, pointDifference)
        self.allMatches[i].status = "C"
      }
    }
  }

  self.addPoints = function(i, homeIndex, awayIndex, pointDifference) {
    if(self.allMatches[i].outcome === "A") {
      self.rankingsData[homeIndex].pts = parseFloat((self.rankingsData[homeIndex].pts + 1 - pointDifference).toFixed(2))
      self.rankingsData[awayIndex].pts = parseFloat((self.rankingsData[awayIndex].pts - 1 - pointDifference).toFixed(2))
    } else if(self.allMatches[i].outcome === "B") {
      self.rankingsData[homeIndex].pts = parseFloat((self.rankingsData[homeIndex].pts - 1 - pointDifference).toFixed(2))
      self.rankingsData[awayIndex].pts = parseFloat((self.rankingsData[awayIndex].pts + 1 - pointDifference).toFixed(2))
    } else if(self.allMatches[i].outcome === "D") {
      self.rankingsData[homeIndex].pts = parseFloat((self.rankingsData[homeIndex].pts + pointDifference).toFixed(2))
      self.rankingsData[awayIndex].pts = parseFloat((self.rankingsData[awayIndex].pts + pointDifference).toFixed(2))
    }
  }

  self.updateRankings = function() {
    self.rankingsData.sort(function(a, b) {
      return b.pts - a.pts
    })
    for(var i=0; i<self.rankingsData.length; i++) {
      self.rankingsData[i].pos = i + 1
    }
  }

  self.shuffleMatches = function (array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1))
          var temp = array[i]
          array[i] = array[j]
          array[j] = temp
      }
      return array
  }
}])
