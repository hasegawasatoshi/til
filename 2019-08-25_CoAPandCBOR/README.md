# CBOR データを CoAP で受信する。

* CBOR DATAFORMAT <https://camel.apache.org/components/latest/cbor-dataformat.html> を使う。
    * Camel 3.0 から使えるので、Camel のバージョンを上げる。

# 使い方

変換結果を `HashMap` に入れる場合
```
        CBORDataFormat spec = new CBORDataFormat();
        spec.useMap();

        ... (snip) ...

        from("direct:update-device-info")
            .unmarshal(spec)
            .to("log:coap-server")
```

CoAPデータを受信したときのログ
```
2019-08-25 16:00:10.244  INFO 10648 --- [   CoapServer#4] coap-server                              : Exchange[ExchangePattern: InOnly, BodyType: java.util.HashMap, Body: {uid=59ba18ef-82ff-9d80-cdc0-8d135d9ecffd, data=[{timestamp=1566654001, temperature=28.5, humidity=65, pressure=1.2}, {timestamp=1566654241, temperature=29.8, humidity=72, pressure=1.1}, {timestamp=1566654481, temperature=27.9, humidity=60, pressure=0.9}]}]
```

クラスオブジェクトのリストに入れる場合はこんな感じ。
```
        CBORDataFormat format = new CBORDataFormat();
        format.useList();
        format.setUnmarshalType(SomeObject.class);
```