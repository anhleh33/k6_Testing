import http from 'k6/http' // Use HTTP features (GET, POST, PUT, DELETE)
import { sleep } from 'k6' // Pause the virtual user for some time
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"

export const options = {
    vus: 30,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate<0.01'],   // Tỷ lệ lỗi phải dưới 1% (0.01)
        http_req_duration: ['p(95)<500'], // 95% số request phải nhanh hơn 500ms
    },
};

//1. Open browser
//2. Visit website
//3. Wait for 1 second and repeat
export default function () {       // The main scenario for every virtual user to execute; export default tell k6 where to start
    http.get("https://gnn2026.netlify.app/") // Send an HTTP GET request to given URL
    sleep(1)                       // Pause the virtual users for 1s
}
// The function loops again and keep running until test duration ends

export function handleSummary(data) {
    return {
        "reports/report_30vus_5d.html": htmlReport(data),
    }
}