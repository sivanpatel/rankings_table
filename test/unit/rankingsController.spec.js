describe('rankingsController', function() {

  beforeEach(module('RankingsTable'))

  var ctrl

  beforeEach(inject(function($controller) {
    ctrl = $controller('rankingsController')
  }))

  it('finds the team object from the array', function() {
    expect(ctrl.findTeam("England")).toEqual({ "team": { "name": "England", "id": 1 }, "pos": 4, "pts": 52.32 })
  })

  it('correctly calculates the point difference when the home team has a higher score', function() {
    expect(ctrl.pointDifference(10, 9)).toEqual(4.00)
  })

  it('correctly calculates the point difference when the away team has a higher score', function() {
    expect(ctrl.pointDifference(2, 6)).toEqual(-1.00)
  })

  it('correctly calculates the point difference when the points are not whole numbers', function() {
    expect(ctrl.pointDifference(4.5, 3)).toEqual(4.50)
  })

  it('correctly calculates the point difference when the points difference is greater than 10', function() {
    expect(ctrl.pointDifference(20, 3)).toEqual(10.00)
  })

  it('correctly calculates the point difference when the points difference is less than -10', function() {
    expect(ctrl.pointDifference(10, 30)).toEqual(-10.00)
  })

  it('creates a match', function() {
    expect(ctrl.createMatch(undefined ,"England", "Romania")).toEqual({ matchId: NaN, description: 'Match NaN', teams: [ Object({ id: 1, name: 'England', abbreviation: 'ENG' }), Object({ id: 24, name: 'Romania', abbreviation: 'ROM' }) ], scores: [  ], status: 'U', outcome: 'N' })
  })

  it('creates all matches', function() {
    expect(ctrl.createMatches().length).toEqual(20)
  })

  it('checks scores and returns the first team as a winner', function() {
    expect(ctrl.checkWinner([10,0])).toEqual("A")
  })

  it('checks scores and returns the second team as a winner', function() {
    expect(ctrl.checkWinner([0,10])).toEqual("B")
  })

  it('checks scores and returns a draw if the teams have the same score', function() {
    expect(ctrl.checkWinner([10,10])).toEqual("D")
  })

  it('checks for a no result', function() {
    expect(ctrl.checkWinner([])).toEqual("N")
  })

  it('adds a match result for a home win', function() {
    ctrl.createMatches()
    ctrl.addMatch("Australia", "New Zealand", 10, 0)
    expect(ctrl.allMatches[0]).toEqual({ matchId: 1, description: 'Match 1', teams: [ Object({ id: 32, name: 'Australia', abbreviation: 'AUS' }), Object({ id: 62, name: 'New Zealand', abbreviation: 'NEW' }) ], scores: [ 10, 0 ], status: 'C', outcome: 'A' })
  })

  it('adds a match result for an away win', function() {
    ctrl.createMatches()
    ctrl.addMatch("Australia", "New Zealand", 0, 10)
    expect(ctrl.allMatches[0]).toEqual({ matchId: 1, description: 'Match 1', teams: [ Object({ id: 32, name: 'Australia', abbreviation: 'AUS' }), Object({ id: 62, name: 'New Zealand', abbreviation: 'NEW' }) ], scores: [ 0, 10 ], status: 'C', outcome: 'B' })
  })

  it('adds a match result for a draw', function() {
    ctrl.createMatches()
    ctrl.addMatch("Australia", "New Zealand", 10, 10)
    expect(ctrl.allMatches[0]).toEqual({ matchId: 1, description: 'Match 1', teams: [ Object({ id: 32, name: 'Australia', abbreviation: 'AUS' }), Object({ id: 62, name: 'New Zealand', abbreviation: 'NEW' }) ], scores: [ 10, 10 ], status: 'C', outcome: 'D' })
  })

  it('correctly calculates the new points for both teams after the home team has won a match', function() {
    ctrl.createMatches()
    ctrl.addMatch("Australia", "New Zealand", 10, 0)
    ctrl.calculatePoints()
    expect(ctrl.rankingsData[0].pts).toEqual(54.91)
    expect(ctrl.rankingsData[1].pts).toEqual(52.68)
  })

  it('correctly calculates the new points for both teams after the away team has won a match', function() {
    ctrl.createMatches()
    ctrl.addMatch("Australia", "New Zealand", 0, 10)
    ctrl.calculatePoints()
    expect(ctrl.rankingsData[0].pts).toEqual(52.91)
    expect(ctrl.rankingsData[1].pts).toEqual(54.68)
  })

  it('correctly calculates the new points for both teams after a draw', function() {
    ctrl.createMatches()
    ctrl.addMatch("Australia", "New Zealand", 10, 10)
    ctrl.calculatePoints()
    expect(ctrl.rankingsData[0].pts).toEqual(54.55)
    expect(ctrl.rankingsData[1].pts).toEqual(54.32)
  })

  it('updates the rankings after a match', function() {
    ctrl.createMatches()
    ctrl.addMatch("France", "England", 19, 23)
    ctrl.calculatePoints()
    ctrl.updateRankings()
    expect(ctrl.rankingsData[2].team.name).toEqual("England")
    expect(ctrl.rankingsData[2].pos).toEqual(3)
  })

})
