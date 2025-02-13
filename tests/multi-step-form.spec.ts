import { test, expect } from "@playwright/test";

test.describe("Form", () => {
  test("Get a summary after filling form", async ({ page }) => {
    await asALoggedInUser(page);
    await iWantToFillInTheForm(page);
    await soICanSeeASummaryOfMySelections(page);
  });
});

async function asALoggedInUser(page) {
  await page.goto("http://localhost:5173");
}

async function clickNextStep(page) {
  await page.getByRole("button", { name: "Next Step" }).click();
}

async function iWantToFillInTheForm(page) {
  await page.getByRole("textbox", { name: "Name" }).fill("Test");
  await page
    .getByRole("textbox", { name: "Email Address" })
    .fill("test@test.com");
  await page.getByRole("textbox", { name: "Phone Number" }).fill("123456");
  await clickNextStep(page);
  await clickNextStep(page);
  await clickNextStep(page);
}

async function soICanSeeASummaryOfMySelections(page) {
  await expect(
    page.getByRole("heading", { name: "Finishing up" }),
  ).toBeVisible();
}

// await expect(
//   page.getByRole("heading", { name: "Personal info" }),
// ).toBeVisible();

// await expect(
//   page.getByRole("heading", { name: "Pick add-ons" }),
// ).toBeVisible();
