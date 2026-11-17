import { test, expect } from "@playwright/test";

test.describe("Autenticação", () => {
  test("Validar login com credenciais válidas", async ({ page }) => {
    await page.goto("/");

    const emailInput = await page.getByLabel("E-mail");
    await emailInput.fill(process.env.VIITA_EMAIL);

    const senhaInput = await page.getByLabel("Senha");
    await senhaInput.fill(process.env.VIITA_PASSWORD);

    const botaoEntrar = await page.getByRole("button", { name: "Entrar" });
    await botaoEntrar.click();

    await expect(page).toHaveTitle("Marcação");
  });

  test("Validar login com senha incorreta", async ({ page }) => {
    await page.goto("/");

    const emailInput = await page.getByLabel("E-mail");
    await emailInput.fill(process.env.VIITA_EMAIL);

    const senhaInput = await page.getByLabel("Senha");
    await senhaInput.fill("@Sistema1234");

    const botaoEntrar = await page.getByRole("button", { name: "Entrar" });
    await botaoEntrar.click();

    await expect(
      page.getByText(
        "E-mail ou senha inválidos. Se você acabou de se cadastrar, confirme sua conta antes de entrar.",
      ),
    ).toBeVisible();
  });

  test("Validar login com usuário inexistente", async ({ page }) => {
    await page.goto("/");

    const emailInput = await page.getByLabel("E-mail");
    await emailInput.fill("usuario-inexistente@gmail.com");

    const senhaInput = await page.getByLabel("Senha");
    await senhaInput.fill("@Sistema1234");

    const botaoEntrar = await page.getByRole("button", { name: "Entrar" });
    await botaoEntrar.click();

    await expect(
      page.getByText(
        "E-mail ou senha inválidos. Se você acabou de se cadastrar, confirme sua conta antes de entrar.",
      ),
    ).toBeVisible();
  });

  test("Validar submissão com campos em branco", async ({ page }) => {
    await page.goto("/");

    const botaoEntrar = await page.getByRole("button", { name: "Entrar" });
    await botaoEntrar.click();

    await expect(page.getByText("Informe o e-mail.")).toBeVisible();

    await expect(page.getByText("Informe a senha")).toBeVisible();
  });

  test("Validar acionamento do botão Entrar via teclado", async ({ page }) => {
    await page.goto("/");

    const emailInput = await page.getByLabel("E-mail");
    await emailInput.fill(process.env.VIITA_EMAIL);

    const senhaInput = await page.getByLabel("Senha");
    await senhaInput.fill(process.env.VIITA_PASSWORD);

    await senhaInput.press("Enter");

    await expect(page).toHaveTitle("Marcação");
  });

  test("Validar limite máximo de caracteres nos campos", async ({ page }) => {
    await page.goto("/");

    const emailInput = await page.getByLabel("E-mail");
    await emailInput.fill(
      "doemailparacadastrartestandolimitedoemailparacadastrartestandolimitedoemailparacadastrartestandolimitedoemailparacadastrartestandolimitedoemailparacadastrar@gmail.com",
    );

    const senhaInput = await page.getByLabel("Senha");
    await senhaInput.fill(
      "@ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    );

    await senhaInput.press("Enter");

    await expect(
      page.getByText(
        "E-mail ou senha inválidos. Se você acabou de se cadastrar, confirme sua conta antes de entrar.",
      ),
    ).toBeVisible();
  });
});
