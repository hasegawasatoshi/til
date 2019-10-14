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

https://github.com/nuxt-community/auth-module/blob/dev/examples/demo/pages/login.vue を参考に、login page を作成する。


API を直接実行する。 From ではなく、body に JSON で記述する。

```
curl -X POST \
  http://localhost:3000/api/auth/login \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 7117cfa5-4062-415a-d66c-37e40de16d79' \
  -d '{
  "username": "abc",
  "password": "123"
}
'
```

```
$ curl -X POST \
>   http://localhost:3000/api/auth/login \
>   -H 'Cache-Control: no-cache' \
>   -H 'Content-Type: application/json' \
>   -H 'Postman-Token: 7117cfa5-4062-415a-d66c-37e40de16d79' \
>   -d '{
>   "username": "abc",
>   "password": "123"
> }
> '

レスポンスとして `accessToken` が返ってくる。
```
{"token":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsInBpY3R1cmUiOiJodHRwczovL2dpdGh1Yi5jb20vbnV4dC5wbmciLCJuYW1lIjoiVXNlciBhYmMiLCJzY29wZSI6WyJ0ZXN0IiwidXNlciJdLCJpYXQiOjE1NzEwMjIwOTB9.IqP5phmCxU5QN2BIQfr_eg1oM408aD_Mj6ShxpXs0rk"}}
```

すべてのページでログインを要求する場合、 `nuxt.config.js` に追加する。

```
  router: {
    middleware: ['auth']
  },
```

