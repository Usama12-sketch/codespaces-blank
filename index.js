const playwright = require('playwright');

(async () => {
    // Launch browser and create page
    const browser = await playwright.chromium.launch({
        timeout : 120*60*1000
        
    });
    // await page.waitForTimeout(3000)
    const page = await browser.newPage();
    await page.waitForTimeout(12000)
//  await browser.launchTimeout(120*60*1000)
   await page.setDefaultTimeout(150000);

  // Go to the target URL
  await page.goto('https://www.catch.com.au/product/maxwell-williams-6-cup-bakermaker-non-stick-large-muffin-pan-24879640/?sid=Home%20%26%20Kitchen%20%3E%20Kitchen%20%3E%20Baking&st=15&srtrev=sj-btsljf1lfkv2ocf0yq3d4b.click&pid=24879640&sp=26&oid=87338530'); // Replace with the actual URL

  // Select the first element with the specified class using a reliable selector
  await page.waitForTimeout(3000)
  const element = await page.locator('h1'); // Use `:first-of-type` for clarity
  const title = await page.title(); // Use `:first-of-type` for clarity
  await page.screenshot({path: 'img.png'})
  // Check if the element exists before proceeding
  if (await element.boundingBox()) { // Enhanced check using `boundingBox()`
    try {
      // Get the aria-label value (if present) using a safer attribute retrieval method
      const ariaLabel = await element.evaluate(node => node.innerHTML);

      if (ariaLabel) {
        console.log('Aria-label of the first element:', ariaLabel , title);
      } else {
        console.log('The first element does not have an aria-label attribute.');
      }
    } catch (error) {
      console.error('Error retrieving aria-label:', error);
    }
  } else {
    console.log('Element not found.');
  }

  // Close the browser
  await browser.close();
})();
