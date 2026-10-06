function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = JSON.parse(e.postData.contents || "{}");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Tapped at", "Answer", "Page", "Language", "Screen", "User agent"]);
  }

  sheet.appendRow([
    data.tappedAt || new Date().toISOString(),
    data.answer || "Unknown",
    data.page || "",
    data.language || "",
    data.screen || "",
    data.userAgent || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
