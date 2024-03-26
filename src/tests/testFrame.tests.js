describe('Frame', () => {

it('Validate Frame', async () => {
    await browser.navigateTo('https://cloud.google.com/products/calculator-legacy')
    const getDocumentText = () => browser.executeScript(
        'return document.documentElement.outerText',
        []
    )
    const iframe = await browser.findElement('css selector', 'iframe')
    await browser.switchToFrame(iframe)
    
    await browser.pause(1000)
    expect(await getDocumentText())
        .toContain('Google Cloud Pricing Calculator')
    await browser.pause(1000)
})
})