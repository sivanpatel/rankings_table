function Match(index, homeTeamID, homeTeamName, homeTeamAbbreviation, awayTeamID, awayTeamName, awayTeamAbbreviation) {
  var match = {
    "matchId": index + 1,
    "description": "Match " + (index + 1),
    "teams": [
                {"id": homeTeamID, "name": homeTeamName, "abbreviation": homeTeamAbbreviation },
                {"id": awayTeamID, "name": awayTeamName, "abbreviation": awayTeamAbbreviation}
              ],
    "scores": [],
    "status": "U",
    "outcome": "N"
  }

  return match
}
