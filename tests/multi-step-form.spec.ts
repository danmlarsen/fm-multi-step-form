import { test, expect, type Page } from "@playwright/test";

test.describe("Form", () => {
  test("See a summary of the form", async ({ page }) => {
    await asAUser(page);
    await iWantToFillInTheForm(page);
    await soICanSeeASummaryOfMySelections(page);
  });

  test("Get a validation error if some input is invalid", async ({ page }) => {
    await asAUser(page);
    await iWantToFillAnInvalidForm(page);
    await soIGetAValidationError(page);
  });

  test("Should be able to go back and change the form before confirming the form", async ({
    page,
  }) => {
    await asAUser(page);
    await iWantToFillInTheForm(page);
    await goBackAndChangeOrder(page);
    await soICanSeeASummaryWithMyChanges(page);
  });
});

async function asAUser(page: Page) {
  await page.goto("http://localhost:5173");
}

async function clickNextStep(page: Page) {
  await page.getByRole("button", { name: "Next Step" }).click();
}

async function clickGoBack(page: Page) {
  await page.getByRole("button", { name: "Go Back" }).click();
}

async function iWantToFillInTheForm(page: Page) {
  await page.getByRole("textbox", { name: "Name" }).fill("Test");
  await page
    .getByRole("textbox", { name: "Email Address" })
    .fill("test@test.com");
  await page.getByRole("textbox", { name: "Phone Number" }).fill("123456");
  await clickNextStep(page);
  await clickNextStep(page);
  await clickNextStep(page);
}

async function iWantToFillAnInvalidForm(page: Page) {
  await page.getByRole("textbox", { name: "Name" }).fill("");
  await page.getByRole("textbox", { name: "Email Address" }).fill("testing");
  await page.getByRole("textbox", { name: "Phone Number" }).fill("123");
  await clickNextStep(page);
}

async function goBackAndChangeOrder(page: Page) {
  await clickGoBack(page);
  await clickGoBack(page);
  await page.getByRole("button", { name: /Pro/i }).click();
  await clickNextStep(page);
  await clickNextStep(page);
}

async function soICanSeeASummaryOfMySelections(page: Page) {
  await expect(
    page.getByRole("heading", { name: "Finishing up" }),
  ).toBeVisible();
}

async function soIGetAValidationError(page: Page) {
  await expect(page.getByText("This field is required").nth(1)).toBeVisible();
  await expect(page.getByText("Invalid email").nth(1)).toBeVisible();
  await expect(page.getByText("Invalid phone number").nth(1)).toBeVisible();
}

async function soICanSeeASummaryWithMyChanges(page: Page) {
  await expect(page.getByText(/Pro/i).nth(1)).toBeVisible();
}
