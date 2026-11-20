const { test, expect } = require('@playwright/test');

const TODO_URL = 'https://demo.playwright.dev/todomvc/';

// TEST 1 – NÄIDIS: kasutaja saab ülesande lisada.
test('kasutaja saab lisada ülesande', async ({ page }) => {
  await page.goto(TODO_URL);

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Õpi UI testimist');
  await input.press('Enter');

  await expect(page.getByText('Õpi UI testimist')).toBeVisible();
});

// TEST 2 - ÕPILANE: kasutaja saab ülesande lõpetatuks märkida.
test('kasutaja saab ülesande lõpetatuks märkida', async ({ page }) => {
  await page.goto(TODO_URL);

  // 1. Добавляем задачу "Esimene test"
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Esimene test');
  await input.press('Enter');

  // 2. Находим строку этой задачи
  const task = page.getByRole('listitem').filter({
    hasText: 'Esimene test'
  });

  // 3. Находим чекбокс внутри строки и отмечаем его
  const checkbox = task.getByRole('checkbox');
  await checkbox.check();

  // 4. Проверяем, что чекбокс отмечен
  await expect(checkbox).toBeChecked();
});


// TEST 3 – ÕPILANE: kasutaja saab ülesande kustutada.
test('kasutaja saab ülesande kustutada', async ({ page }) => {
  await page.goto(TODO_URL);

  // 1. Добавляем задачу "Kustutatav ülesanne"
  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Kustutatav ülesanne');
  await input.press('Enter');

  // 2. Находим строку задачи
  const task = page.getByRole('listitem').filter({
    hasText: 'Kustutatav ülesanne'
  });

  // 3. Наводим курсор мыши на строку, чтобы появилась кнопка удаления
  await task.hover();

  // 4. Находим кнопку удаления и нажимаем ее
  await task.locator('button.destroy').click();

  // 5. Проверяем, что задачи больше нет в списке
  await expect(page.getByText('Kustutatav ülesanne')).toHaveCount(0);

});
