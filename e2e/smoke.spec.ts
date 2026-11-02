import { expect, test } from '@playwright/test';
import { BASE } from '../src/lib/site.mjs';

test('home lists Front Matter and Parts 1 through 4', async ({ page }) => {
  await page.goto(`${BASE}/`);
  await expect(page.getByRole('heading', { name: 'Front Matter' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Part 1: Getting Started' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Part 2: Recording Daily Lab Work' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Part 3: Thinking, Searching, and Reviewing' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Part 4: Working with an AI Agent (MCP)' })).toBeVisible();
  await page.getByRole('link', { name: /Introduction/ }).click();
  await expect(page.getByRole('heading', { level: 1, name: 'Introduction' })).toBeVisible();
});

test('the Introduction carries the five sections of STYLE.md §3 and all six callout icons', async ({ page }) => {
  await page.goto(`${BASE}/introduction/`);
  for (const name of ['About This Book', 'Foolish Assumptions', 'Icons Used in This Book', 'Beyond the Book', 'Where to Go from Here']) {
    await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
  }
  for (const cls of ['.box-tip', '.box-remember', '.box-warning', '.box-eln', '.box-team', 'details.box-deeper']) {
    await expect(page.locator(cls).first()).toBeVisible();
  }
});

test('on screen, web-only shows and print-only is hidden', async ({ page }) => {
  await page.goto(`${BASE}/sampler/`);
  await expect(page.getByText('WEB-ONLY:')).toBeVisible();
  await expect(page.getByText('PRINT-ONLY:')).toBeHidden();
});

test('printing swaps them', async ({ page }) => {
  await page.goto(`${BASE}/sampler/`);
  await page.emulateMedia({ media: 'print' });
  await expect(page.getByText('PRINT-ONLY:')).toBeVisible();
  await expect(page.getByText('WEB-ONLY:')).toBeHidden();
});

test('Going Deeper is collapsed on the web and opens on click', async ({ page }) => {
  await page.goto(`${BASE}/sampler/`);
  const box = page.locator('details.box-deeper');
  await expect(box).not.toHaveAttribute('open', '');
  await box.locator('summary').click();
  await expect(box.locator('.katex-display')).toBeVisible();
});

test('Sources is collapsed on the web, keeps its #sources id, and opens on click', async ({ page }) => {
  await page.goto(`${BASE}/ch1-what-an-eln-is-and-why-links-matter/`);
  const box = page.locator('details.sources-section');
  await expect(box).toHaveCount(1);
  await expect(box).not.toHaveAttribute('open', '');
  await expect(box.locator('summary h2#sources')).toBeVisible();
  await expect(box.locator('ul').first()).toBeHidden();
  await box.locator('summary').click();
  await expect(box.locator('ul').first()).toBeVisible();
});

test('the chapter TOC is folded on a phone and open on a desktop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/introduction/`);
  const toc = page.locator('details.toc');
  await expect(toc).not.toHaveAttribute('open', '');
  await expect(toc.locator('nav')).toBeHidden();
  await toc.locator('summary').click();
  await expect(toc.locator('nav')).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`${BASE}/introduction/`);
  await expect(toc.locator('summary')).toBeHidden();
  await expect(toc.locator('nav')).toBeVisible();
});

test('a figure opens full size on click and closes with Escape', async ({ page }) => {
  await page.goto(`${BASE}/ch1-what-an-eln-is-and-why-links-matter/`);
  const dialog = page.locator('dialog.figzoom');
  await expect(dialog).toBeHidden();
  await page.locator('#fig-1-1 img').click();
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.figzoom-img')).toBeVisible();
  await expect(dialog.locator('.figzoom-caption')).toContainText('Figure 1-1');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});
