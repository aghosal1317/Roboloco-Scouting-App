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
        "Weight (lbs)", "Drive Train", "Swerve Motors",
        "Hopper Capacity", "Can Traverse", "Can Collect From",
        "Drive Team Experience (seasons)", "Bulldozing Notes",
        "Intake Type", "Shooter Style", "Shoot Mode", "Shooting Positions",
        "Climb Level", "Climb Timing",
        "Has Auto / Works?", "Auto Paths", "Auto Align (Tele-Op)?",
        "Other Notes"
      ]);
    }

    pitSheet.appendRow([
      timestamp,
      data.teamNumber,
      data.weight, data.driveTrain, data.swerveMotors,
      data.hopperCapacity, data.traversal, data.collection,
      data.driveTeamExp, data.bulldozing,
      data.intakeType, data.shooterStyle, data.shootMode, data.shootingPositions,
      data.climb, data.climbTiming,
      data.hasAuto, data.autoPaths, data.autoAlign,
      data.otherNotes
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
