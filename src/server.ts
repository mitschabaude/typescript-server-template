import http from "http";
import https from "https";
import { letsencrypt, selfsigned, Credentials } from "./tls";

const domain = "dev.plusepsilon.com";
let credentials: Credentials;
try {
  credentials = letsencrypt(domain);
} catch (err) {
  credentials = selfsigned(domain);
}

http.createServer(serve).listen(80, "0.0.0.0", () => {
  console.log(`Server running at http://localhost`);
});
https.createServer(credentials, serve).listen(443, "0.0.0.0", () => {
  console.log(`Server running at https://localhost`);
});

async function serve(req: http.IncomingMessage, res: http.ServerResponse) {
  console.log("request ", req.headers.host, req.url);

  switch (req.url) {
    case "/":
    default:
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Hello World</h1>\n");
      break;

    case "/json":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ response: "Hello World" }));
      break;
  }
}
