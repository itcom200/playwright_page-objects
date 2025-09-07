import { Page } from "@playwright/test";
import { BasePage } from "./001_BasePage";
import Locators01 from "../locators/locators.json";

export class CarBase extends BasePage {
    private LT01 = Locators01.CarBase;
    constructor(page: Page) {
        super(page);
    }

    async getCarTitle(): Promise<string> {
        return await this.getText(this.LT01.carTitle);
    }
    async getCarNameAndPrice() {
        const carName = this.page.locator(this.LT01.carName);
        const carPrice = this.page.locator(this.LT01.carPride);
        const carCount = await carPrice.count();
        //cars เป็น array ของ object มี name,price [{},{}]
        const cars: { name: string, price: string }[] = [];

        //.nth(i) คือการเข้าถึง ลำดับเฉยๆ เพราะมันเป็น env ได้เยอะ
        for (let i = 0; i < carCount; i++) {
            const name = await carName.nth(i).innerText();
            const price = await carPrice.nth(i).innerText();
            console.log(`Car Name:${name}, Car Price:${price}`);
            cars.push({ name: name, price: price }); //เก็บข้อมูลคันนี้ลงใน array
        }
        return cars;
    }


}