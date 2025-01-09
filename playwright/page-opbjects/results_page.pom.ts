import {type Locator, type Page} from '@playwright/test'
import { BasePage } from './base_page.pom'

export class ResultsPage extends BasePage{
    private readonly _results_search: Locator;
    private _results_count: number;
    private readonly _ddl_zone_filter: Locator;
    private readonly _btn_clear_zone: Locator;
    private readonly _region_list: Locator;
    private _region_list_count: number;
    private readonly _container_regions: Locator;

    constructor(page: Page){
        super(page);
        this._results_search = page.getByTestId('result').first();
        this._ddl_zone_filter = page.getByTestId('region-filter-label').first();
        this._btn_clear_zone = page.getByText('Clear All');
        this._container_regions = page.getByTestId('dropdown-options');
        this._region_list = page.locator('xpath=//div[@data-testid="dropdown-options"]//div[@class="BDI1KtNF8HUPBZ4Cw_nK"]//span[@class="fdosLIuRgrWo7SyeqSUb"]');
    }

    async get_results_count(){
        this._results_count = Number(await this._results_search.count());
        console.log(` >result count: ${this._results_count}`)

        return this._results_count;
    }

    async get_result_search(){
        return this._results_search.allTextContents();
    }

    async clear_region_filter(){
        await this._ddl_zone_filter.click();
        await this._btn_clear_zone.click();
    }

    async get_region_count(){
        await this._ddl_zone_filter.click();
        
        this._region_list_count = Number(await this._region_list.count());
        console.log(` >region count: ${this._region_list_count}`)

        return this._region_list_count;
    }

}