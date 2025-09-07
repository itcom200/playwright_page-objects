import { Page } from "@playwright/test";
import { HomePage } from "../pages/002_HomePage";
import { NewCarsPage } from "../pages/003_NewCarsPage";
import { CarBase } from "../pages/004_CarBase";
import { BMWPage } from "../pages/005_BMWPage";
import { HondaPage } from "../pages/006_HondaPage";
import { HyundaiPage } from "../pages/007_HyundaiPage";
import { ToyotaPage } from "../pages/008_ToyotaCarsPage";

export class PageFixture {
    //readonly-รีดอนลี-อ่านอย่างเดียว = ป้องกันไม่ให้มีการแก้ไข
    readonly page:Page;
    readonly homePage: HomePage;
    readonly newCarsPage: NewCarsPage;
    readonly carBase: CarBase;
    readonly bmwPage: BMWPage;
    readonly hondaPage: HondaPage;
    readonly hyundaiPage: HyundaiPage;
    readonly toyotaPage: ToyotaPage;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.newCarsPage = new NewCarsPage(page);
        this.carBase = new CarBase(page);
        this.bmwPage = new BMWPage(page);
        this.hondaPage = new HondaPage(page);
        this.hyundaiPage = new HyundaiPage(page);
        this.toyotaPage = new ToyotaPage(page);
    }
}