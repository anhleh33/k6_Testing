import http from 'k6/http' 
import { sleep, check } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io' //value from cmd line, if not => case 2

export const options = {
    // Load to change overtime
    stages: [
        {duration: '10s', target: 5}, //Over 10s, gradually increase users to 5 VUs (0 -> 5 in 10s)
        {duration: '20s', target: 5}, //Stay at 5 VUs for 20s
        {duration: '10s', target: 0}, //Gradually reduce back to 0 VU
    ],
    threshold: {
        http_req_duration: ['p[95]<500']
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