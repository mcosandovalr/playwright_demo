import { test, expect } from '@playwright/test';

test.beforeEach
('Test init', async({page})=>{
  await page.goto('https://duckduckgo.com/');
  await page.getByPlaceholder('Search without being tracked').click();
  await page.getByPlaceholder('Search without being tracked').fill('android');
  await page.getByLabel('Search', { exact: true }).click();
});

test('test case 1: each result has android in text', async ({ page }) => {
  
  
  const results_search = page.locator('xpath=//li[@data-layout="organic"]//h2/a[@data-testid="result-title-a"]/span');
  await results_search.first().waitFor();

  const results_count = await results_search.count();  
  if(results_count == 0 ){
    throw new Error('No results :C')
  }

  const results_text = await results_search.allTextContents();
  results_text.forEach(text => {
    expect(text.toLowerCase()).toContain('android');
  });

});

test('test case 2: total greater than 10', async ({ page }) => {

  const regions_arrow = page.locator('div:nth-child(2) > .KE_4ibtn0WI3iUo6lJw9 > .UWzy821Y58lvrLxQ7fnz > .sG3VWKPgDjJAlSrJSoLP');
  await regions_arrow.click();
  
  await page.getByText('Clear All').click();
  await regions_arrow.click();
  

  const region_list = page.locator('xpath=//div[@data-testid="dropdown-options"]//div[@class="BDI1KtNF8HUPBZ4Cw_nK"]//span[@class="fdosLIuRgrWo7SyeqSUb"]');
  await region_list.first().waitFor();

  const region_list_count = await region_list.count();

  expect(region_list_count).toBeGreaterThan(10)

});

test('pom test', async({page}) =>{
  
});