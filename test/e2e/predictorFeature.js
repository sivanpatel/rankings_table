describe('Score Predictor', function() {

  var table = element.all(by.id('table'))
  var matches = element.all(by.id('matches'))

  beforeEach(function() {
    browser.get('http://localhost:8080')
  })

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Score Predictor')
  })

  it('displays a list of teams', function() {
    expect(table.count()).toEqual(5)
  })

  it('displays a list of matches', function() {
    expect(matches.count()).toEqual(20)
  })

})
