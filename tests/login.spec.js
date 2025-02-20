import { test, expect } from '@playwright/test';

import { obterCodigo2FA } from '../support/db';

import { loginPage } from '../pages/loginPage';

import { dashPage } from '../pages/dashPage';

import { cleanJobs, getJob } from '../support/redis';

test('nao deve logar quando o codigo 2FA é invalido', async ({ page }) => {

  const loginP = new loginPage(page);

  const usuario = {
    cpf:'00000014141',
    senha:'147258'
  }

  await cleanJobs();

  await loginP.acessaPagina();
  await loginP.preencherCPF(usuario.cpf);
  await loginP.preencherSenha(usuario.senha);

  await loginP.preencherCodigo2FA('123456');

  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});


test('deve logar a conta do usuário', async ({ page }) => {

  const loginP = new loginPage(page);
  const dashP = new dashPage(page);

  const usuario = {
    cpf:'00000014141',
    senha:'147258'
  }

  await cleanJobs();

 await loginP.acessaPagina();
 await loginP.preencherCPF(usuario.cpf);
 await loginP.preencherSenha(usuario.senha);

 // checkpoint
 await page.getByRole('heading', { name: 'Verificação em duas etapas' }).waitFor({timeout: 3000});

 const codigo = await getJob();
 

  // const codigo = await obterCodigo2FA(usuario.cpf);
  
  await loginP.preencherCodigo2FA(codigo);



  await expect(await dashP.verificaSaldo()).toContainText('R$ 5.000,00');

});



