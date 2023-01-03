import http from "k6/http";
import { check, sleep } from "k6";

const default_vus = 5;
const target_vus_env = `${__ENV.TARGET_VUS}`;
const target_vus = isNumeric(target_vus_env)
  ? Number(target_vus_env)
  : default_vus;

export const options = {
  stages: [
    { duration: "5s", target: target_vus },
    { duration: "10s", target: target_vus },
    { duration: "5s", target: 0 },
  ],
};

export default function () {
  const response = http.get("https://acc-portfolio-41c30.web.app/", {
    headers: { Accepts: "application/json" },
  });
  
  check(response, { "Status code 200": (r) => r.status === 200 });
  sleep(0.3);
}
