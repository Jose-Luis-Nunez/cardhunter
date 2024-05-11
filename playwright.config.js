// @ts-check
const { devices } = require('@playwright/test');

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
        headless: false,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        proxy: {
            server: 'socks5://10.64.0.1:1080'
        },
        viewport: {width: 1366, height: 800},
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                browserName: 'chromium',
                args: ["--enable-features=ShadowDOMV0"],
            },
        }
    ],
};

module.exports = config;
