## Climate API

Aplicação Back-end para consultar previsões de tempo.

### Requisitos

- NodeJS
- MongoDB
- Gcc (no Linux), ou [windows-build-tools](https://github.com/nodejs/node-gyp#installation)

### Como executar

```
npm i && npm start
```

### Testes

```
npm test
```

Durante o desenvolvimento é possível reiniciar o servidor automaticamente a cada alteração de arquivo, use o comando:

```
npm run dev
```

Caso precise executar apenas um teste:
```
Altere "it(..." para "it.only(..." nos arquivos de teste (não se esqueça de alterar de volta para "it")

```

### Executar em produção

```
npm run prod
```
