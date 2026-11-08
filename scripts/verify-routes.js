const http = require("http");
const { spawn } = require("child_process");

const routes = [
  "/ar",
  "/en",
  "/ar/services",
  "/en/services",
  "/ar/color-studio",
  "/en/color-studio",
  "/ar/gallery",
  "/en/gallery",
  "/ar/about",
  "/en/about",
  "/ar/contact",
  "/en/contact",
  "/ar/privacy",
  "/en/privacy",
  "/ar/terms",
  "/en/terms",
  "/robots.txt",
  "/sitemap.xml",
];

function fetchRoute(path) {
  return new Promise((resolve, reject) => {
    const req = http.get("http://127.0.0.1:3000" + path, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on("error", reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error("Timeout"));
    });
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("=== STARTING NEXT.JS PRODUCTION SERVER ON 127.0.0.1:3000 ===");
  const server = spawn("cmd.exe", ["/c", "npx", "next", "start", "-H", "127.0.0.1", "-p", "3000"], {
    stdio: "pipe",
  });

  server.stdout.on("data", (d) => process.stdout.write(`[SERVER] ${d}`));
  server.stderr.on("data", (d) => process.stderr.write(`[SERVER ERR] ${d}`));

  let ready = false;
  for (let i = 0; i < 20; i++) {
    await wait(1000);
    try {
      const ping = await fetchRoute("/ar");
      if (ping.status === 200) {
        ready = true;
        break;
      }
    } catch (e) {
      // connecting...
    }
  }

  if (!ready) {
    console.error("Server failed to respond on 127.0.0.1:3000 within 20s.");
    server.kill();
    process.exit(1);
  }

  console.log("\n=== INFINITE BRIGHT INDEPENDENT ROUTE AUDIT ===");
  let failed = 0;
  for (const path of routes) {
    try {
      const res = await fetchRoute(path);
      const isOk = res.status === 200;
      console.log(`[${isOk ? "PASS" : "FAIL"}] ${path} -> HTTP ${res.status} (${res.body.length} bytes)`);
      if (!isOk) failed++;
    } catch (err) {
      console.log(`[ERROR] ${path} -> ${err.message}`);
      failed++;
    }
  }

  // Deep inspection on /ar
  console.log("\n=== DEEP CONTENT & SECURITY AUDIT ON /ar ===");
  const arPage = await fetchRoute("/ar");
  const checks = [
    { label: "HTML dir=rtl", pass: arPage.body.includes('dir="rtl"') },
    { label: "HTML lang=ar", pass: arPage.body.includes('lang="ar"') },
    { label: "Phone link (+966534422257)", pass: arPage.body.includes("tel:+966534422257") },
    { label: "WhatsApp Concierge (wa.me/966534422257)", pass: arPage.body.includes("wa.me/966534422257") },
    { label: "Official Instagram link", pass: arPage.body.includes("instagram.com/infinity_bright1") },
    { label: "Official TikTok link", pass: arPage.body.includes("tiktok.com/@infinity..bright") },
    { label: "Commercial Registration 1010421626 in Footer", pass: arPage.body.includes("1010421626") },
    { label: "Zero instances of prohibited word 'تشطيب'", pass: !arPage.body.includes("تشطيب") },
    { label: "Default theme init script (light mode)", pass: arPage.body.includes("'light'") || arPage.body.includes('"light"') },
  ];

  for (const c of checks) {
    console.log(`[${c.pass ? "PASS" : "FAIL"}] ${c.label}`);
    if (!c.pass) failed++;
  }

  // Deep inspection on /en
  console.log("\n=== DEEP CONTENT AUDIT ON /en ===");
  const enPage = await fetchRoute("/en");
  const enChecks = [
    { label: "HTML dir=ltr", pass: enPage.body.includes('dir="ltr"') },
    { label: "HTML lang=en", pass: enPage.body.includes('lang="en"') },
    { label: "Zero instances of prohibited word 'تشطيب'", pass: !enPage.body.includes("تشطيب") },
  ];

  for (const c of enChecks) {
    console.log(`[${c.pass ? "PASS" : "FAIL"}] ${c.label}`);
    if (!c.pass) failed++;
  }

  // Clean shutdown
  try {
    spawn("taskkill", ["/pid", server.pid, "/f", "/t"]);
  } catch (e) {
    server.kill();
  }

  console.log(`\nAudit completed with ${failed} failure(s).`);
  process.exit(failed > 0 ? 1 : 0);
}

run();
