// electron-builder afterPack hook — macOS 앱을 ad-hoc 서명하고 검증한다.
//
// Apple Developer ID가 없는 릴리즈에서도 Helper를 포함한 번들 전체의 코드
// 서명 구조를 일관되게 만든다. updater는 번들을 verbatim 복사하므로 이 서명과
// framework 상대 링크가 설치 후에도 그대로 유지된다.

const { execFileSync } = require("node:child_process");
const path = require("node:path");

exports.default = async function afterPack(context) {
  if (context.electronPlatformName !== "darwin") return;

  const productFilename = context.packager.appInfo.productFilename; // "Spiral Buddy Red"
  const appPath = path.join(context.appOutDir, `${productFilename}.app`);

  execFileSync(
    "/usr/bin/codesign",
    ["--force", "--deep", "--sign", "-", appPath],
    { stdio: "inherit" },
  );
  execFileSync(
    "/usr/bin/codesign",
    ["--verify", "--deep", "--strict", appPath],
    { stdio: "inherit" },
  );
  console.log(`[after-pack] ad-hoc signature verified for "${productFilename}"`);
};
