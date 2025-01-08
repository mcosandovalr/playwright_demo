import {type Locator, type Page} from '@playwright/test'
import { BasePage } from './base_page.pom';

export class StartPage extends BasePage{
    //readonly page: Page;
    private readonly _search_box: Locator;
    private readonly _search_button: Locator;

    constructor(page: Page){
        super(page);
        //this.page = page;
        this._search_box = page.getByLabel('Search with DuckDuckGo');
        this._search_button = page.getByLabel('Search', { exact: true });
    }

    async goto(){
        await this.page.goto('https://start.duckduckgo.com/');
    }

    async search_for(q: string){
        await this._search_box.fill(q);
        await this._search_button.click();
    }
}