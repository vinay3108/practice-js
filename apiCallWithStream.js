import fs from "fs";
import csv from "csv-parser";
import fetch from "node-fetch";


const API_URL = "https://qagenai.droom.in/get-mmyt";
const HEADERS = {
  Authorization: "St-eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
  "Content-Type": "application/json",
};

const INPUT_FILE = "vehicles.tsv";        // Your TSV input
const OUTPUT_LOG = "response_log.jsonl";  // Output log file

// Function to send POST request
function sendRequest(vehicle_company, vehicle_model, registration_date) {
  const body = JSON.stringify({
    vehicle_company: vehicle_company,
    vehicle_model: vehicle_model,
    registration_date: registration_date,
  });

  return fetch(API_URL, {
    method: "POST",
    headers: HEADERS,
    body: body,
  })
    .then(function(res) {
      return res.json().catch(function() { return {}; });
    })
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      return { error: err.message };
    });
}

// Convert registration_date by replacing "-" with " "
function convertDate(dateStr) {
    if (!dateStr) return "";
    return dateStr.replace(/\s+/g, "-").trim();
}

// Main function
function processTSV() {
  const results = [];

  fs.createReadStream(INPUT_FILE)
    .pipe(csv({ separator: "\t" })) // tab-separated
    .on("data", function(row) {
      results.push(row);
    })
    .on("end", async function() {
      console.log("📄 Loaded " + results.length + " rows from " + INPUT_FILE);

      const logStream = fs.createWriteStream(OUTPUT_LOG, { flags: "a" });

      for (let i = 0; i < results.length; i++) {
        var row = results[i];

        // Avoid optional chaining
        var vehicle_company = (row["vehicle_company"] && row["vehicle_company"].trim()) ||
                              (row[" vehicle_company"] && row[" vehicle_company"].trim()) ||
                              "";
        var vehicle_model = (row["vehicle_model"] && row["vehicle_model"].trim()) ||
                            (row[" vehicle_model"] && row[" vehicle_model"].trim()) ||
                            "";
        var registration_date = (row["registration_date"] && row["registration_date"].trim()) ||
                                (row[" registration_date"] && row[" registration_date"].trim()) ||
                                "";

        // ✅ Convert registration_date (replace - with space)
        registration_date = convertDate(registration_date);
        console.log(registration_date);
        console.log("🚗 Requesting: " + vehicle_model + " | Date: " + registration_date);

        var response = await sendRequest(vehicle_company, vehicle_model, registration_date);

        // Log as JSON line
        logStream.write(JSON.stringify({
          vehicle_company: vehicle_company,
          vehicle_model: vehicle_model,
          registration_date: registration_date,
          response: response
        }) + "\n");
      }

      logStream.end();
      console.log("✅ All responses saved to " + OUTPUT_LOG);
    })
    .on("error", function(err) {
      console.error("❌ Error reading TSV:", err);
    });
}

// Run
processTSV();
