npm init

// express -> biblioteca que facilita criaçoes de api rest

npm add express

//-D -> dependencias de desenvolvimento que nao vao para produção
// @types/express -> integraçao do expres com typescript (funcionar autocomplete)
// ts-node-dev -> automatiza o processo de converter em js

npm add -D typescript @types/express ts-node-dev

// src -> todo codigo da aplicação fica aqui, oque estiver fora é configuração ou algo do tipo


// rodar aplicação
// no package.json -> "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
// --respawn → reinicia automaticamente ao salvar arquivos.
// --transpile-only → ignora verificação de tipos, focando em velocidade.
// se npm run dev der problema deve configurar o tsconfig.json para usar o NodeNext


npm run dev

// Eslint -> para analisar código JavaScript/TypeScript estaticamente, identificando e corrigindo erros, bugs e padrões de estilo inconsistentes, promovendo a qualidade, robustez e padronização do código em um projeto, especialmente em equipes

--------------------------------------

Metodos HTTP

- Get => criação
- Post => consulta/publicar
- Put => atualização
- Delete => exclusão

* nao usar get para enviar dados (raramente)

req -> dados enviados do front para o back

// para dar semantica nos status das requisições
``npm add http-status-codes``

Variaveis de Ambiente

- Configurar funcionamento do servidor com escala ainda em produção

.env (.env.example para segurança)

.proces.env.PORT

``npm add dotenv `` -> inicializar variaveis de ambiente

Converter ts para js em produção
- webpacked (compilador)
- tsc (precisa do tsconfig)

``npx tsc --init`` -> da instruçoes para o compilador, para conseguir usar o node

``npx tsc``

``    "outDir": "./build",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "build"
  ]
}``
