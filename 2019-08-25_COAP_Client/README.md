# CoAP の Payload に CBOR を使う。

* CoAP クライアントとして `node-coap-client` <https://www.npmjs.com/package/node-coap-client> を使用する。
    * 今回は手を出さないが DTLS に対応しているため。

* GET した結果

```
$ node request.js
{"code":{"major":2,"minor":5},"format":50,"payload":{"type":"Buffer","data":[123,32,34,102,111,111,34,58,32,34,98,97,114,34,32,125]}}
{ "foo": "bar" }
```

* `format` の `50` は `application/json` の意味
    * https://tools.ietf.org/html/rfc7252#section-12.3

* CBOR データを POST したサンプルは `post.js` 。ただし、サーバー側でデコードするのは次回に持ち越し。
