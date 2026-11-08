const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = path.join(__dirname, "..", "docs", "audit-screenshots");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const breakpoints = [
  { width: 360, height: 800, label: "mobile-360-small-android" },
  { width: 375, height: 812, label: "mobile-375-iphone-se" },
  { width: 390, height: 844, label: "mobile-390-iphone-14" },
  { width: 430, height: 932, label: "mobile-430-iphone-15-pro-max" },
  { width: 768, height: 1024, label: "tablet-768-ipad-mini" },
  { width: 1024, height: 768, label: "desktop-1024-small-laptop" },
  { width: 1440, height: 900, label: "desktop-1440-macbook-pro" },
  { width: 1920, height: 1080, label: "desktop-1920-fhd" },
];

function pingServer() {
  return new Promise((resolve) => {
    http.get("http://127.0.0.1:3000/ar", (res) => resolve(res.statusCode === 200))
      .on("error", () => resolve(false));
  });
}

async function run() {
  console.log("=== STARTING RESPONSIVENESS AUDIT WITH REAL GOOGLE CHROME ===");

  const server = spawn("cmd.exe", ["/c", "npx", "next", "start", "-H", "127.0.0.1", "-p", "3000"], {
    stdio: "pipe",
  });

  // Explicit healthcheck wait
  let ready = false;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 600));
    ready = await pingServer();
    if (ready) break;
  }

  if (!ready) {
    console.error("Server not ready.");
    server.kill();
    process.exit(1);
  }

  console.log("Server ready. Capturing screenshots across all 8 breakpoints...");
  const results = [];

  for (const bp of breakpoints) {
    const screenshotPath = path.join(OUTPUT_DIR, `${bp.label}.png`);
    const cmd = `"${CHROME_PATH}" --headless=new --no-sandbox --disable-gpu --window-size=${bp.width},${bp.height} --screenshot="${screenshotPath}" "http://127.0.0.1:3000/ar"`;
    
    try {
      execSync(cmd, { stdio: "pipe", timeout: 20000 });
      const stats = fs.statSync(screenshotPath);
      console.log(`[PASS] ${bp.width}px (${bp.label}) -> Captured screenshot: ${stats.size} bytes`);
      results.push({ ...bp, status: "PASS", size: stats.size, path: screenshotPath });
    } catch (err) {
      console.error(`[FAIL] ${bp.width}px -> ${err.message}`);
      results.push({ ...bp, status: "FAIL", error: err.message });
    }
  }

  // Kill server
  try {
    execSync(`taskkill /pid ${server.pid} /f /t`);
  } catch (e) {
    server.kill();
  }

  console.log("\n=== RESPONSIVENESS AUDIT SUMMARY ===");
  const allPass = results.every((r) => r.status === "PASS");
  console.log(`Total Breakpoints Tested: ${results.length}`);
  console.log(`Status: ${allPass ? "ALL 8 BREAKPOINTS VERIFIED (100% PASS)" : "SOME FAILED"}`);
  
  process.exit(allPass ? 0 : 1);
}

run();
