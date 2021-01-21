import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
  stages: [
    { duration: '10s', target: 100},
    { duration: '10s', target: 50},
    { duration: '10s', target: 25},
    { duration: '10s', target: 10},
  ],
};
export default function () {
  let res = http.get(__ENV.URL);
  check(res, {'status was 200': (r) => r.status == 200});
  sleep(1);
}