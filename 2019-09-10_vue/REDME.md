`npx` コマンドをインストール

```
$ npm install npx -g
```

Nuxt.js アプリケーションを作る

```
$ npx create-nuxt-app my-practice
```

質問には以下のように回答

```
✨  Generating Nuxt.js project in my-practice
? Project name my-practice
? Project description My finest Nuxt.js project
? Author name hasegawasatoshi
? Choose the package manager Npm      
? Choose UI framework Vuetify.js
? Choose custom server framework Express
? Choose Nuxt.js modules Axios
? Choose linting tools ESLint
? Choose test framework None
? Choose rendering mode Universal (SSR)
? Choose development tools jsconfig.json (Recommended for VS Code)
```

プロジェクトが作成された

```
�🎉  Successfully created project my-practice

  To get started:

        cd my-practice
        npm run dev

  To build & start for production:

        cd my-practice
        npm run build
        npm run start
```

`index.js` に router を追加する。

```
const router = express.Router();
router.use(require("./users"));
app.use("/api/users", router);
```

`http://localhost:3000/api/users` にアクセスする。

```
[{"id":"1","name":"icchy","age":"24","hobby":"card game"},{"id":"2","name":"icchy-san","age":"24","hobby":"hip hop"}]
```

`pages/users.vue` を追加。 `axios` で HTTP GET する。
`http://localhost:3000` を省略したいけど、そうすると `http://127.0.0.1/80` にアクセスしてしまう模様。

```
<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    const { data } = await axios.get(`http://localhost:3000/api/users`)
    return { users: data }
  }
}
</script>
```

サイドメニューを増やすには `layouts/default.vue` を編集する。

# 参考

* https://crieit.net/posts/Nuxt-Express
* https://jp.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
* https://jp.vuejs.org/v2/guide/installation.html
* https://ja.nuxtjs.org/guide/plugins/
* https://qiita.com/at-946/items/08de3c9d7611f62b1894
