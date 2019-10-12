# Goal

Nuxt の Auth-module を使って認証できるようにする。

# worklogs

Nuxt.js アプリケーションを作る

```
$ npx create-nuxt-app web
```

`nuxt.config.js` の `modules` に追加する。
```
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
```


auth-moduleをインストールする。
```
$ npm install --save @nuxtjs/auth
```

その他、必要なモジュールもインストールする。
```
$ npm install --save body-parser cookie-parser express-jwt jsonwebtoken
```

`server/auth.js` に https://github.com/nuxt-community/auth-module/tree/dev/examples/api を参考に、 `auth.js` を配置する。

`store/index.js` を配置する。空ファイルでよい。

serverMiddleware に登録する。
```
  serverMiddleware: [
    './server/auth'
  ],
```

`nuxt.config.js` に Auth-module の設定を追加する。
```
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { propertyName: 'token.accessToken' }
        }
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/callback'
    },
  },
```