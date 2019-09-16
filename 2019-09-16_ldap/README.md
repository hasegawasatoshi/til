# Goal

* LDAPを使ってnodejsでForm認証できるようにする。

# Work logs

docker で OpenLDAP を立てる。

```
$ docker-compose up -d
```

ブラウザで `localhost:8080` にアクセスする。 `Login DN` には `cn=admin,dc=sample,dc=com` のように入力する。

ユーザーを作るのであれば POSIX をグループを作ってからユーザーを作る。

コンテナに入って、グループやユーザーが作られていることが確認できる。

```
$ docker exec -it ef449cde37de bash
root@ef449cde37de:/# slapcat
dn: dc=sample,dc=com
objectClass: top
objectClass: dcObject
objectClass: organization
o: sample
dc: sample
structuralObjectClass: organization

... (snip) ...
```

独自のスキーマを設定するにはこの辺を参考にするとよさそう。詳細はまたあとで調べる。

* https://qiita.com/tkj/items/8e2e992280f933dbae7c
* https://qiita.com/gigatune/items/969b6b0015e09de930a8

node (express) から LDAP にアクセスする方法を調べる。

```
$ npm init
$ npm install express --save
```

`apps.js` に適当な API を実装する。

lapdjs のインストールでエラーが出た。
```
$ npm install ldapjs --save

... (snip) ...

gyp ERR! configure error 
gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.
gyp ERR! stack     at PythonFinder.failNoPython (C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\configure.js:484:19)
gyp ERR! stack     at PythonFinder.<anonymous> (C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\lib\configure.js:509:16)
gyp ERR! stack     at C:\Program Files\nodejs\node_modules\npm\node_modules\graceful-fs\polyfills.js:282:31
gyp ERR! stack     at FSReqWrap.oncomplete (fs.js:153:21)

... (snip) ...
```

どうも `pyhon` が必要らしい。 python をインストールしたらインストールできた。

LDAP を使って認証するためには、 `bind` が成功するかどうかで判定すればよいらしい。

* https://github.com/ldapjs/node-ldapjs/issues/132#issuecomment-27139213

認証をかけるにはJWTを使えばよいはず。

* https://qiita.com/AkihiroTakamura/items/ac4f1d3ec32effdd63d2


# References

* https://qiita.com/bremen/items/1e8760dfd9f372a29315
* https://qiita.com/yoshiyasu1111/items/c2d7d5f9a70afdaa8372
* https://qiita.com/tkj/items/8e2e992280f933dbae7c
* https://qiita.com/gigatune/items/969b6b0015e09de930a8
* https://github.com/ldapjs/node-ldapjs/issues/132#issuecomment-27139213
