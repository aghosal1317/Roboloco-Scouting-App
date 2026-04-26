function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = JSON.parse(e.postData.contents);
  var timestamp = Utilities.formatDate(new Date(), "America/New_York", "yyyy-MM-dd hh:mm:ss a");

  if (data.formType === 'pit') {
    var pitSheet = ss.getSheetByName("Pit Scouting");
    if (!pitSheet) {
      pitSheet = ss.insertSheet("Pit Scouting");
    }

    if (pitSheet.getLastRow() === 0) {
      pitSheet.appendRow([
        "Timestamp", "Team #",
        "Height (in)", "Weight (lbs)", "Dimensions (L x W)",
        "Drive Train",
        "Shooter", "Indexer",
        "Hopper Capacity", "Cycles",
        "Over Bump?", "Under Trench?"
      ]);
    }

    pitSheet.appendRow([
      timestamp,
      data.teamNumber,
      data.height, data.weight, data.dimensions,
      data.driveTrain,
      data.shooter, data.indexer,
      data.hopperCapacity, data.cycles,
      data.overBump, data.underTrench
    ]);

  } else {
    var matchSheet = ss.getSheetByName("Match Scouting");
    if (!matchSheet) {
      matchSheet = ss.insertSheet("Match Scouting");
    }

    if (matchSheet.getLastRow() === 0) {
      matchSheet.appendRow([
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

    matchSheet.appendRow([
      timestamp,
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
  }

  return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
