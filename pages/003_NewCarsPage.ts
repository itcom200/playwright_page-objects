import { Page } from "@playwright/test";
import { BasePage } from "./001_BasePage";
import Locators01 from "../locators/locators.json";

export class NewCarsPage extends BasePage {
    private LT01 = Locators01.NewCarsPage_LT;
    constructor(page: Page) {
        super(page);
    }

    async getHeaderText():Promise<string>{
        return await this.getText(this.LT01.newCarsHeading);
    }
    async gotoBMWCar(){
        await this.click(this.LT01.bmwCar)
    }
    async gotoToyotaCar(){
        await this.click(this.LT01.toyotaCar)
    }
    async gotoHondaCar(){
        await this.click(this.LT01.hondaCar)
    }
    async gotoHyundaiCar(){
        await this.click(this.LT01.hyundaiCar)
    }
}

