import {type Locator, type Page} from '@playwright/test'

export class BasePage{
    public readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    public async goto(url: string){
        await this.page.goto(url);
    }
}