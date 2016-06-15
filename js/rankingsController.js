rankingsTable.controller('rankingsController', [function() {

  var self = this

  self.rankingsData = [
                        { "team": { "name": "Australia", "id": 32, "abbreviation": "AUS" }, "pos": 1, "pts": 54.23 },
                        { "team": { "name": "New Zealand", "id": 62, "abbreviation": "NZL" }, "pos": 2, "pts": 54.00 },
                        { "team": { "name": "France", "id": 2, "abbreviation": "FRA" }, "pos": 3, "pts": 52.95 },
                        { "team": { "name": "England", "id": 1, "abbreviation": "ENG" }, "pos": 4, "pts": 52.32 },
                        { "team": { "name": "Romania", "id": 24, "abbreviation": "ROM" }, "pos": 5, "pts": 43.50 }
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

  self.createMatches = function(array) {
    var fn = function(n, src, got, all) {
    if (n == 0) {
        if (got.length > 0) {
            all[all.length] = got
        }
        return
    }
    for (var j = 0; j < src.length; j++) {
        fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all)
    }
    return
    }

    var all = []

    for (var i = 0; i < 5; i++) {
        fn(i, array, [], all)
    }

    all.push(array)

    for(var i=0; i<all.length; i++) {
      if(all[i].length == 2) {
        self.allMatches.push(all[i])
      }
    }

    for(var i=0; i<10; i++) {
      self.allMatches.push(self.allMatches[i].reverse())
    }

    return self.allMatches
  }

  self.createMatch = function(homeTeam, awayTeam) {
    var index
    var homeTeamID = self.findTeam(homeTeam).team.id
    var homeTeamName = self.findTeam(homeTeam).team.name
    var homeTeamAbbreviation = self.findTeam(homeTeam).team.abbreviation
    var awayTeamID = self.findTeam(awayTeam).team.id
    var awayTeamName = self.findTeam(awayTeam).team.name
    var awayTeamAbbreviation = self.findTeam(awayTeam).team.abbreviation
    var match = new Match(index, homeTeamID, homeTeamName, homeTeamAbbreviation, awayTeamID, awayTeamName, awayTeamAbbreviation)
    return match
  }



}])
