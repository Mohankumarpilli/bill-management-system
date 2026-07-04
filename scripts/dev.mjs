import { spawn } from "node:child_process";

function run(cmd, args, extraEnv = {}) {
  const proc = spawn(cmd, args, { stdio: "inherit", env: { ...process.env, ...extraEnv } });
  proc.on("exit", (code) => process.exit(code ?? 0));
  return proc;
}

const api = run(process.execPath, ["--env-file=.env", "server/dev-server.mjs"], {
  NODE_USE_SYSTEM_CA: "1",
});
const vite = run(process.platform === "win32" ? "npx.cmd" : "npx", ["vite"]);

function shutdown() {
  api.kill();
  vite.kill();
  process.exit();
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
