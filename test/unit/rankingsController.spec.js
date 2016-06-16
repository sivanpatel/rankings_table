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
    expect(ctrl.allMatches[0]).toEqual({ matchId: 1, description: 'Match 1', teams: [ Object({ id: 62, name: 'New Zealand', abbreviation: 'NEW' }), Object({ id: 32, name: 'Australia', abbreviation: 'AUS' }) ], scores: [ 10, 0 ], status: 'C', outcome: 'A' })
  })

  it('adds a match result for an away win', function() {
    ctrl.createMatches()
    ctrl.addMatch("Australia", "New Zealand", 0, 10)
    expect(ctrl.allMatches[0]).toEqual({ matchId: 1, description: 'Match 1', teams: [ Object({ id: 62, name: 'New Zealand', abbreviation: 'NEW' }), Object({ id: 32, name: 'Australia', abbreviation: 'AUS' }) ], scores: [ 0, 10 ], status: 'C', outcome: 'B' })
  })

  it('adds a match result for a draw', function() {
    ctrl.createMatches()
    ctrl.addMatch("Australia", "New Zealand", 10, 10)
    expect(ctrl.allMatches[0]).toEqual({ matchId: 1, description: 'Match 1', teams: [ Object({ id: 62, name: 'New Zealand', abbreviation: 'NEW' }), Object({ id: 32, name: 'Australia', abbreviation: 'AUS' }) ], scores: [ 10, 10 ], status: 'C', outcome: 'D' })
  })

})
