import * as math from "./math.js";
import "../style.css";

const a = math.sum(1, 2);
console.log(process.env.NODE_ENV);

if (!PRODUCTION) {
  console.log("Debug info");
}

if (PRODUCTION) {
  console.log("Production log");
}
