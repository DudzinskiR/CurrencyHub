![baner_E2E](https://github.com/DudzinskiR/CurrencyHub/assets/130515506/d620244e-97c6-4029-b1b6-383c7c43594f)
[Live demo](https://currencyhub.vercel.app)


### E2E - Playwright

Open your terminal and navigate to the playwright directory
```bash
    cd playwright
```
**(Optional)** Copy the example environment file to create your own:

```bash
    cp .env.example .env
```
**Note**: Default values are already set in code


Show the Playwright test report:
```bash
    npx playwright show-report
```
To update snapshots for the tests:
```bash
    npx playwright test --update-snapshots
```
This command will update the snapshots used in the tests. It is useful when the application's UI or behavior has changed, and the tests need to be aligned accordingly.
