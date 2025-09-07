import { Page } from "@playwright/test";
import { BasePage } from "./001_BasePage";
import Locators01 from "../locators/locators.json";


export class HondaPage extends BasePage {
    private LT01 = Locators01.NewCarsPage_LT;
    
    constructor(page: Page) {
        super(page);
    }


}
