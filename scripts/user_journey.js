import http from 'k6/http' 
import { sleep, check, group } from 'k6'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"

const BASE_URL = __ENV.BASE_URL || 'https://test.k6.io'

export const options = {
    stages: [
        {duration: '10s', target: 5}, 
        {duration: '20s', target: 10}, 
        {duration: '10s', target: 7},
        {duration: '15s', target: 16},
        {duration: '10s', target: 30},
        {duration: '15s', target: 25},
        {duration: '15s', target: 20},
        {duration: '10s', target: 10},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],
    }
};

export default function () {
    group('Open home page', () => {
        const res = http.get(BASE_URL)

        check(res, {
            'home page status is 200': (r) => r.status === 200
        })
    })
    sleep(2)

    group('Open News Page', () => {
        const res = http.get(`${BASE_URL}/news.php`)
        
        check(res, {
            'news page status is 200': (r) => r.status === 200
        })
    })
    sleep(2)

    group('Open Blogs Page',() => {
        const res = http.get(`${BASE_URL}/blog`)

        check(res, {
            'blog loaded is 200': (r) => r.status === 200
        })
    })
    sleep(2)
}

export function handleSummary(data) {
    return {
        "reports/report_user_journey_vu30.html": htmlReport(data),
    }
}