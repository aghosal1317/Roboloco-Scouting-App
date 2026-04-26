function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp", "Scouter Name", "Match #", "Team #", "Alliance",
      "Auto Path", "Transition Period",
      "Tele-Op Active", "Tele-Op Inactive",
      "Shooting Rating", "Shooting Notes",
      "Intaking Rating", "Intaking Notes",
      "Endgame Notes", "Climb Level",
      "Defended", "Defended Notes",
      "Played Defense", "Defense Notes",
      "Immobilized/Breakdown", "Breakdown Notes",
      "Penalties", "Other Notes"
    ]);
  }

  sheet.appendRow([
    new Date().toISOString(),
    data.scouterName, data.matchNumber, data.teamNumber, data.alliance,
    data.autoPath, data.transitionPeriod,
    data.teleOpActive, data.teleOpInactive,
    data.shootingRating, data.shootingNotes,
    data.intakingRating, data.intakingNotes,
    data.endgameNotes, data.climbLevel,
    data.defended, data.defendedNotes,
    data.playedDefense, data.defenseNotes,
    data.immobilized, data.immobilizedNotes,
    data.penalties, data.otherNotes
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
