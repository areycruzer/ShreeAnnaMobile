describe('Example', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it('should have welcome screen', async () => {
        await expect(element(by.text('Welcome to Shree Anna'))).toBeVisible();
    });

    it('should show login screen after language selection', async () => {
        await element(by.text('English')).tap();
        await expect(element(by.text('Enter phone number'))).toBeVisible();
    });
});
