import fs from "fs";

export type Credentials = {
  key: string;
  cert: string;
  ca?: string;
};

// pull tls credentials from default letsencrypt folder
export function letsencrypt(domain: string) {
  const folder = `/etc/letsencrypt/live/${domain}`;
  let key = fs.readFileSync(`${folder}/privkey.pem`, "utf8");
  let cert = fs.readFileSync(`${folder}/cert.pem`, "utf8");
  let ca = fs.readFileSync(`${folder}/chain.pem`, "utf8");
  return { key, cert, ca };
}

// alternatively, self-sign credentials
const folder = "./dist/.cert";
const keyFile = `${folder}/key.pem`;
const certFile = `${folder}/cert.pem`;

export function selfsigned(domain: string) {
  if (fs.existsSync(keyFile) && fs.existsSync(certFile)) {
    let key = fs.readFileSync(keyFile, "utf8");
    let cert = fs.readFileSync(certFile, "utf8");
    return { key, cert };
  }

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
  const selfsigned = require("selfsigned"); // more efficient than top level import
  let attrs = [{ name: "commonName", value: domain }];
  let { private: key, cert } = selfsigned.generate(attrs, { days: 365 }) as {
    private: string;
    cert: string;
  };
  fs.writeFileSync(keyFile, key);
  fs.writeFileSync(certFile, cert);
  return { key, cert };
}
