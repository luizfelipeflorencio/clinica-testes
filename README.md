# Viita — testes de autenticação

Suíte Playwright com os seis cenários do PDF: login válido, senha incorreta,
usuário inexistente, campos vazios, login via Enter e limite de caracteres.

## Executar

Na pasta deste projeto:

```sh
npm install
npx playwright install chromium
export VIITA_EMAIL='email-da-conta-de-teste'
read -rs 'VIITA_PASSWORD?Senha da conta de teste: '
export VIITA_PASSWORD
npm test
npm run report
```

O comando `read` acima é para zsh. Em bash, use
`read -rs -p 'Senha da conta de teste: ' VIITA_PASSWORD`.

A URL padrão é `http://187.41.119.192`. Para alterar, defina `VIITA_BASE_URL`.
As credenciais são lidas das variáveis de ambiente; arquivos `.env` não são
carregados automaticamente. Sem credenciais, CT-01, CT-02 e CT-05 ficam ignorados
com indicação do motivo. Cada teste usa uma sessão isolada.

## Evidências

- `playwright-report/index.html`: relatório HTML.
- `test-results/`: capturas de tela e traces de falhas.
- CT-06: capturas adicionais anexadas ao relatório para 199, 200, 201 e 1.000 caracteres.

O PDF não informa o limite numérico esperado nem a entrada que causou a falha
original. O CT-06 usa o limite de 200 caracteres observado na aplicação e verifica
o truncamento pelo navegador, as mensagens de validação, a resposta HTTP e a
ausência de exceções JavaScript. Não realiza bypass do limite do navegador.
