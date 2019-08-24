# Node-JS で CBOR データを作成する。

* node-cbor <https://github.com/hildjj/node-cbor/blob/master/bin/json2cbor> を試してみる。

```
$ npm init
$ npm install --save cbor
```

* コマンドラインで JSON を CBOR に変換する。

```
node node_modules/cbor/bin/json2cbor sample.json > sample.cbor
```

* sample.json

```
{
    "uid": "59ba18ef-82ff-9d80-cdc0-8d135d9ecffd",
    "data": [
        {
            "timestamp": 1566654001,
            "temperature": 28.5,
            "humidity": 65,
            "pressure": 1.2
        },
        {
            "timestamp": 1566654241,
            "temperature": 29.8,
            "humidity": 72,
            "pressure": 1.1
        },
        {
            "timestamp": 1566654481,
            "temperature": 27.9,
            "humidity": 60,
            "pressure": 0.9
        }
    ]
}
```

* sample.cbor

```
00000000  a2 63 75 69 64 78 24 35  39 62 61 31 38 65 66 2d  |.cuidx$59ba18ef-|
00000010  38 32 66 66 2d 39 64 38  30 2d 63 64 63 30 2d 38  |82ff-9d80-cdc0-8|
00000020  64 31 33 35 64 39 65 63  66 66 64 64 64 61 74 61  |d135d9ecffdddata|
00000030  83 a4 69 74 69 6d 65 73  74 61 6d 70 1a 5d 61 3e  |..itimestamp.]a>|
00000040  31 6b 74 65 6d 70 65 72  61 74 75 72 65 fb 40 3c  |1ktemperature.@<|
00000050  80 00 00 00 00 00 68 68  75 6d 69 64 69 74 79 18  |......hhumidity.|
00000060  41 68 70 72 65 73 73 75  72 65 fb 3f f3 33 33 33  |Ahpressure.?.333|
00000070  33 33 33 a4 69 74 69 6d  65 73 74 61 6d 70 1a 5d  |333.itimestamp.]|
00000080  61 3f 21 6b 74 65 6d 70  65 72 61 74 75 72 65 fb  |a?!ktemperature.|
00000090  40 3d cc cc cc cc cc cd  68 68 75 6d 69 64 69 74  |@=......hhumidit|
000000a0  79 18 48 68 70 72 65 73  73 75 72 65 fb 3f f1 99  |y.Hhpressure.?..|
000000b0  99 99 99 99 9a a4 69 74  69 6d 65 73 74 61 6d 70  |......itimestamp|
000000c0  1a 5d 61 40 11 6b 74 65  6d 70 65 72 61 74 75 72  |.]a@.ktemperatur|
000000d0  65 fb 40 3b e6 66 66 66  66 66 68 68 75 6d 69 64  |e.@;.fffffhhumid|
000000e0  69 74 79 18 3c 68 70 72  65 73 73 75 72 65 fb 3f  |ity.<hpressure.?|
000000f0  ec cc cc cc cc cc cd                              |.......|
```

* サイズは 536 byte -> 247 byte

* JSON を CBOR にエンコードする

```
const cbor = require('cbor');
const data = require('./sample.json');
const encoded = cbor.encode(data);
```

* CBOR を JSON にエンコードする。

```
cbor.decodeAll(encoded, function(error, obj) {
    if (error == null) {
        console.log(JSON.stringify(obj));
    } else {
        console.log(error);
    }
});
```

* LPWA でデータを送信するケースなので、本当にデータを圧縮したい場合には、デコーダ側（サーバ側）でデータスキーマを持たせる方式のほうが良いかもしれない。SORACOMのバイナリパーサーみたいな感じで。
