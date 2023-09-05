// @ts-check
const { chromium, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
    testDir: './tests',
    timeout: 60000,
    expect: {
        timeout: 10000
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 4 : undefined,
    reporter: [['html', { open: 'never', outputFolder: 'reports' }]],
    outputDir: 'test-results/',

    use: {
        actionTimeout: 10000,
        headless: true,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                browserName: 'chromium',
                ignoreHTTPSErrors: true,
                headless: true,
                viewport: { width: 1366, height: 800 },

                args: ["--enable-features=ShadowDOMV0"],

                // Launch a new browser for each test.
                browser: async ({ browserName }, use) => {
                    const browser = await chromium.launch();
                    await use(browser);
                    await browser.close();
                },
            },
        },
    ],
};

module.exports = config;
