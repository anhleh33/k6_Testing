import http from 'k6/http' 
import { sleep, check } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io' //value from cmd line, if not => case 2
//k6 run -e BASE_URL=https://test.k6.io script/load_testing.js

export const options = {
    vus: 5,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95)<100'],
        http_req_failed: ['rate<=0.05'],
        checks: ['rate>=0.9']
    }
};

export default function () {
    const response = http.get(BASE_URL)

    check(response, {
        'status is 200': (r) => r.status === 200
    })

    sleep(2)
}

export function handleSummary(data) {
    return {
        "report_load_testing.html": htmlReport(data),
    }
}