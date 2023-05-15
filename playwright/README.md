![baner_E2E](https://github.com/DudzinskiR/CurrencyHub/assets/130515506/00cbff64-3f5a-480b-b7ff-519e45adb282)



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
