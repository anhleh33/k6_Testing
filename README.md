# HOW TO INSTALL K6
k6 is a performance testing tools, using JS

## ⚙️ Install k6 

1. Windows (using Chocoley)
```
choco install k6
```
2. Mac (using Homebrew)
```
brew install k6
```
3. Linux (Debian/Ubuntu)
```
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```
4. Docker
```
docker pull grafana/k6
```

## ✅ Check k6 version (to ensure it is already installed)
```
k6 version
```

## 🔬 Run k6 scripts
```
k6 run first-test.js
```
It will run with single virtual user, single duration, single iteration

To run with specific quanity:
```
k6 run scripts/first_k6_script.js --vus 3 --duration 5s
```
With 3 virtual users and duration of 5s
## 📊 Script to get a summary report
Copy and paste this one
```
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    }
}
```
Then direct into the folder you want to save the report and run the test script