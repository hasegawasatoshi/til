# Goal

* passport を使って LADP 認証する。

https://www.npmjs.com/package/passport-ldapauth を使えばよさそう。

```
$ npm install passport-ldapauth --save
```

curl でリクエストを送ることで `200` or `401` が返ってくる。

```
curl -X POST \
  http://localhost:3000/login \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Postman-Token: 341c941c-e836-b123-35ad-1cda02c85a5a' \
  -d 'username=shasegawa&password=1qaz2wsx'
```

passport の使い方
* https://qiita.com/papi_tokei/items/9b852774114ebc7a6255

次は、session と JWT を使って認証を行えるようにする。
