import fs from "fs";

const folder = "./dist/.cert";
const keyFile = `${folder}/key.pem`;
const certFile = `${folder}/cert.pem`;

export default function getCertAndKey() {
  if (fs.existsSync(keyFile) && fs.existsSync(certFile)) {
    let key = fs.readFileSync(keyFile, "utf8");
    let cert = fs.readFileSync(certFile, "utf8");
    return { key, cert };
  }

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  const selfsigned = require("selfsigned"); // more efficient than top level import
  let attrs = [{ name: "commonName", value: "localhost" }];
  let { private: key, cert } = selfsigned.generate(attrs, { days: 365 }) as {
    private: string;
    cert: string;
  };
  fs.writeFileSync(keyFile, key);
  fs.writeFileSync(certFile, cert);
  return { key, cert };
}
