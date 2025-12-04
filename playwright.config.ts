import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
/**************************************************************************************************
 * See https://playwright.dev/docs/test-configuration.*/
export default defineConfig({
  testDir: './tests',
  /* กำหนดให้ไปหาไฟล์ทดสอบในโฟลเดอร์ */
  fullyParallel: true,
  /* ให้รันทดสอบภายในแต่ละไฟล์แบบขนานกัน */
  forbidOnly: !!process.env.CI,
  /* บังคับไม่ให้มี .only ใน test เวลา run บน CI (เพื่อไม่ให้รันแค่ test เดียวแล้วพลาดไป deploy ของจริง */
  retries: process.env.CI ? 2 : 0,
  /* ถ้ารันบน CI ให้ retry test ที่ fail ได้สูงสุด 2 รอบ */
  workers: process.env.CI ? 1 : undefined,
  /* บน CI ให้รันทีละ 1 worker (กัน resource ล้นเครื่อง) */
  reporter: [['html'], ['allure-playwright']],
  /* ใช้ HTML report เพื่อดูผลการทดสอบผ่าน browser (npx playwright show-report) */
  timeout: 25000,
  /*Run เกิน 15s ถ้ายังไม่จบ test จะ (failed) และหยุดทำงานทันที*/
  /**************************************************************************************************/
  /* กำหนด ค่าการตั้งค่าเริ่มต้น สำหรับแต่ละ test run เช่น no.UI , ขนาด browser , baaseURL ไม่ใส่ / */
  use: {
    //เอาไว้ดูย้อนหลังว่า test ทำอะไรบ้างผ่าน UI แบบ interactive
    //off ,on ,retain-on-failure*เก็บตอนFail ,on-first-retry*เก็บตอน retry(รีทาย) ลองใหม่อีกครั้ง
    trace: 'retain-on-failure',  //เทรด(ติดตาม) 

    //VDO จะอยู่ที่ playwright-report/data แค่ชั่วคราวถ้า RunTest ใหม่มันจะหาย 
    //เก็บจริงที่ test-results จะไม่หาย testcase จะไม่ซ้ำกันถ้า run test ซ้ำจะอันเก่าจะหาย แต่ถ้า test ใหม่จะเก็บ
    // video: 'retain-on-failure',//-->off=ไม่อัด , on=อัดทุกTest , retain-on-failure=อันตอนFail , on-first-retry=อัดครั้งแรก
    video: 'off',

    headless: true, //สั่งให้เปิด browser แบบ แสดงผล (มี UI) ขณะทดสอบ

    // viewport: { width: 1280, height: 720 },//--> กำหนดขนาด browser ใช้ได้กับทุกอันที่ Playwright รองรับ
    // screenshot: 'only-on-failure',//-->off=ไม่ถ่าย , on=ถ่ายทุกครั้ง , only-on-failure=ถ่ายตอนFail-->เก็บไฟล์ test-results/
    // baseURL:'https://www.carwale.com/' //วิธีเรียกใช้ await page.goto('/') ใส่แค่นี้หรือจะใส่พาสตามหลังก็ได้
  },
  /**************************************************************************************************/
  /* Configure projects for major browsers */
  // Run test 2 รอบ รอบละ browser คือ Chrome (ผ่าน Chromium) และ Firefox
  // แต่ละรอบจะใช้ preset device ที่ Playwright เตรียมไว้ เช่น desktop viewport, user-agent เป็นต้น
  projects: [
    
    {
    name: 'chromium',
    use: { browserName: 'chromium' }, // ✅ ลบ channel: 'chrome' ออก
    },
    // {
    //   name: 'chromium',
    //   // testMatch:/.*chrome\.spec\.ts/, 
    //   use: {
    //     ...devices['Desktop Chrome']
    //     //channel คือตัวเลือกเสริม ต้องใส่คู่กับ browserName ถ้าไม่กำหนดตัวเสริมมันจะอ่านแค่ browserName
    //     , browserName: 'chromium',//ใช้ Chromium ที่ Playwright โหลดมาเอง ต้องใช้คู่กับ channel
    //     channel: 'chrome',//ใช้ Chrome ตัวเต็มจากเครื่อง ถ้าไม่ใส่ channel จะใช้ Chromium ที่ Playwright โหลดมา
    //     // browserName:'firefox',
    //   },
    // },

    {
      name: 'firefox',
      //สำหรับ match ชื่อไฟล์ test ที่ต้องรัน รันเฉพาะไฟล์ที่ลงท้ายด้วย file_test.spec.ts
      testMatch: /.*firefox\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox']
        , browserName: 'firefox',
        channel: 'firefox',
      },
    },
    /**************************************************************************************************/
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
