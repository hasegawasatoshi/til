# Goal

* Redis で Time Series Data を扱う。

# Work logs

とりあえず動かしてみる。
* https://github.com/RedisTimeSeries/RedisTimeSeries

docker で起動させた。

redis-cli は以下から拾ってくる。
* https://github.com/microsoftarchive/redis/releases

README のサンプルをそのまま打ち込んでみる。

```
$ ./redis-cli.exe
127.0.0.1:6379> TS.CREATE temperature RETENTION 60 LABELS sensor_id 2 area_id 32
OK
127.0.0.1:6379> TS.ADD temperature:3:11 1548149181 30
(integer) 1548149181
127.0.0.1:6379> TS.ADD temperature:3:11 1548149191 42
(integer) 1548149191
127.0.0.1:6379> TS.RANGE temperature:3:11 1548149180 1548149210 AGGREGATION avg 5
1) 1) (integer) 1548149180
   2) "30"
2) 1) (integer) 1548149190
   2) "42"
```

キーの命名とラベルについては使い方を考えた上で決める必要がありそう。
サンプルの `3:11` は何だろう？日付？
`TS.MRANGE` を使うとキーをまたいで検索できるようだが、逆にキーが指定できないので余計なものまで検索してパフォーマンスが心配。
例えば、温度センサーと湿度センサーが搭載されたボックスをモデル化するとしたらどうするのがベストか？

