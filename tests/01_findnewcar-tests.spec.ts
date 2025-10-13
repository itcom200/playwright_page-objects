import { test, expect } from '../Utils/test-base';
import { readCSV } from '../Utils/read.CSV';

test.describe('Find New Car', () => {
    test.beforeEach(async ({ pages }) => {
        await pages.homePage.navigateToHomePage();
    });

    test('Find New Car', async ({ pages }) => {
        await pages.homePage.findNewCar();
        await expect(pages.page).toHaveURL(/.*new-cars/);
        const headerText = await pages.newCarsPage.getHeaderText();
        await console.log(headerText);
        await expect(headerText).toContain('New Cars');
    });

    const testData = readCSV('data/testdata.csv',true)
    test('Parameterized Find New Car', async ({ pages }) => {
        for (const data of testData) {
            await pages.homePage.findNewCar();
            await expect(pages.page).toHaveURL(/.*new-cars/);
            
            if (data.carBrand === 'bmw') {
                await pages.newCarsPage.gotoBMWCar();
                await expect(pages.page).toHaveURL(/.*bmw-cars/);
            } else if (data.carBrand === 'honda') {
                await pages.newCarsPage.gotoHondaCar();
                await expect(pages.page).toHaveURL(/.*honda-cars/);
            } else if (data.carBrand === 'hyundai') {
                await pages.newCarsPage.gotoHyundaiCar();
                await expect(pages.page).toHaveURL(/.*hyundai-cars/);
            } else if (data.carBrand === 'toyota') {
                await pages.newCarsPage.gotoToyotaCar();
                await expect(pages.page).toHaveURL(/.*toyota-cars/);
            }
            const carTitle=await pages.carBase.getCarTitle();
            console.log(`Car Title : ${carTitle}`);
            expect(carTitle.toUpperCase()).toContain(data.carTitle.toUpperCase());
        };
    });

    test('Car Name and Price Test', async ({ pages }) => {
        for (const data of testData) {
            await pages.homePage.findNewCar();
            await expect(pages.page).toHaveURL(/.*new-cars/);
            
            if (data.carBrand === 'bmw') {
                await pages.newCarsPage.gotoBMWCar();
                await expect(pages.page).toHaveURL(/.*bmw-cars/);
            } else if (data.carBrand === 'honda') {
                await pages.newCarsPage.gotoHondaCar();
                await expect(pages.page).toHaveURL(/.*honda-cars/);
            } else if (data.carBrand === 'hyundai') {
                await pages.newCarsPage.gotoHyundaiCar();
                await expect(pages.page).toHaveURL(/.*hyundai-cars/);
            } else if (data.carBrand === 'toyota') {
                await pages.newCarsPage.gotoToyotaCar();
                await expect(pages.page).toHaveURL(/.*toyota-cars/);
            }
            const carTitle=await pages.carBase.getCarTitle();
            console.log(`Car Title : ${carTitle}`);
            expect(carTitle.toUpperCase()).toContain(data.carTitle.toUpperCase());

            const cars=await pages.carBase.getCarNameAndPrice();
            console.log(cars);
        };
    });






});






