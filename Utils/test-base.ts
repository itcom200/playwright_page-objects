//ตั้งชื่อจาก test เป็น baseTest
import { test as baseTest,expect, Page } from '@playwright/test'; 
import { PageFixture } from '../fixtures/page-fixtures';

type Fixtures = {
    pages: PageFixture;
}//ประกาศ Type Alias(เอเลีย-นามแฝง) ตั้งชื่อให้กับรูปแบบข้อมูล
//pages → เป็น object ของ PageFixture (เก็บทุก Page Object ของเรา)

export const test = baseTest.extend<Fixtures>({
    pages: async ({ page }, use) => {
        await use(new PageFixture(page));
    }
//{ page } → browser tab ของ Playwright
//สร้าง Page Object ทุกหน้า (HomePage, NewCarsPage, ฯลฯ) พร้อมใช้งาน
});

export {expect};
