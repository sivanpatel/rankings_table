describe('rankingsController', function() {

  beforeEach(module('RankingsTable'))

  var ctrl

  beforeEach(inject(function($controller) {
    ctrl = $controller('rankingsController')
  }))

  it('finds the team object from the array', function() {
    expect(ctrl.findTeam("England")).toEqual({ "team": { "name": "England", "id": 1, "abbreviation": "ENG" }, "pos": 4, "pts": 52.32 })
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

  it('creates an array of all possible combinations of an array with length 2', function() {
    expect(ctrl.createMatches([1,2,3,4,5]).length).toEqual(20)
  })

  it('creates a match', function() {
    expect(ctrl.createMatch("England", "Romania")).toEqual({ matchId: undefined, description: 'Match undefined', teams: [ Object({ id: 1, name: 'England', abbreviation: 'ENG' }), Object({ id: 24, name: 'Romania', abbreviation: 'ROM' }) ], scores: [  ], status: 'U', outcome: 'N' })
  })

})
