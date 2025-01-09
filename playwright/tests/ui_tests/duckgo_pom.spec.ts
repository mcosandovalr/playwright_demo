import { test, expect } from '@playwright/test';
import { StartPage } from '../../page-opbjects/start_page.pom';
import { ResultsPage } from '../../page-opbjects/results_page.pom';

test.beforeEach('Test POM init', async({page})=>{
  const start_page = new StartPage(page);
  await start_page.goto()
  await expect(page.getByRole('img', { name: 'DuckDuckGo Logo' })).toBeVisible();
  
  await start_page.search_for('android');
});

test('test case 1 (POM)', async ({ page }) => {
  
  const results_page = new ResultsPage(page);

  const results_count = await results_page.get_results_count();

  // if(results_count == 0){
  //   throw new Error('No results =/');
  // }

  const results_text = await results_page.get_result_search();
  results_text.forEach(text=>{
    expect(text.toLowerCase()).toContain('android');
  })
});

test('test case 2 (POM)', async({page})=>{
  const results_page = new ResultsPage(page);

  await results_page.clear_region_filter();
  const region_list_count = await results_page.get_region_count();

  expect(region_list_count).toBeGreaterThan(10);
});