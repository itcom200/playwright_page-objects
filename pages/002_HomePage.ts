import {Page} from '@playwright/test'
import { BasePage } from './001_BasePage';
import Locators01 from '../locators/locators.json'
 
/*ประกาศ class ชื่อ HomePage export ไฟล์ไปใช้ที่อื่นได้
โดย extends(เอกเทน) สืบทอดคุณสมบัติทั้งหมดมาจาก BasePage*/
export class HomePage extends BasePage{ 
    private LT01=Locators01.HomePage_LT;

    constructor(page:Page){
        super(page); //super คือเรียก constructor ของคลาสแม่
    }

    async navigateToHomePage(){
        await this.navigateTo(this.LT01.URL);
    }

    async findNewCar(){
        await this.hover(this.LT01.newCars);
        await this.click(this.LT01.findNewCars);
        await this.waitForTimeout(2000);
    }
}

