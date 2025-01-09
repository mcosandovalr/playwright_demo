import { test, expect } from '@playwright/test';
import { StartPage } from '../page-opbjects/start_page.pom';
import { ResultsPage } from '../page-opbjects/results_page.pom';
import test_data from '../test-data/search_data.td.json';

// Dynamically create a test suite for each word
test_data.forEach(({ word }) => {
  test.describe(`Search tests for word: ${word}`, () => {
    let start_page;
    let results_page;

    // Before each test, initialize the page and perform the search
    test.beforeEach(async ({ page }) => {
      start_page = new StartPage(page);
      results_page = new ResultsPage(page);

      await start_page.goto();
      await expect(page.getByRole('img', { name: 'DuckDuckGo Logo' })).toBeVisible();

      await start_page.search_for(word);
      page.once('load', ()=> console.log(' > Page loaded!'))
    });

    // Test case for verifying results
    test(`Verify results for word: ${word}`, async () => {
      const results_count = results_page.get_results_count();

      // if (results_count == 0 || Number.isNaN(results_count)) {
      //   throw new Error('No results found.');
      // }

      const results_text = await results_page.get_result_search();
      results_text.forEach((text) => {
        console.log(` > text: ${text.toLowerCase()}`)
        expect(text.toLowerCase()).toContain(word);
      });
    });
  });
});
