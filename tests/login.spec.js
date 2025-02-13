import { test, expect } from '@playwright/test';

test('nao deve logar quando codigo 2FA eh invaido', async ({ page }) => {

  const usuario = {
    cpf: '00000014141',
    senha: '147258'
  }

  await page.goto('http://paybank-mf-auth:3000/');
  await page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(usuario.cpf);
  await page.getByRole('button', { name: 'Continuar' }).click();


  for(const digito of usuario.senha){
    await page.getByRole('button', { name: digito }).click();
  }

  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.locator('span')).toContainText('Acesso negado. Por favor, tente novamente.');
});