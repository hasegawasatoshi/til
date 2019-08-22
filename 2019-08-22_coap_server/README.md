# Java で CoAP サーバーを起動する。

* Apache Camel の CoAP Component を使うと簡単に CoAP Server を起動できる。
    * https://camel.apache.org/components/latest/coap-component.html
* HTTP の REST と同じ感覚で実装できる。
```
    @Override
    public void configure() throws Exception {
        restConfiguration().component("coap").port(COAP_PORT);

        rest("/devices")
            .get().to("direct:get-device-list")
            .get("/{id}").to("direct:get-device-info")
            .post("/{id}").to("direct:update-device-info");
```
* Apache Camel のお作法で実装できるのはメリットだが、CoAP Component に関してはドキュメントやサンプルコードがあまりにも少ない。
    * 例えば、レスポンスコードとして `2.05` ではなく `2.31` を返したい場合、どうすればよいか分からなかった。

# Usage

## CoAP Server の起動

```
$ ./gradlew bootRun
Starting a Gradle Daemon, 1 incompatible and 1 stopped Daemons could not be reused, use --status for details

> Task :bootRun

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.1.7.RELEASE)

2019-08-23 00:39:27.865  INFO 1536 --- [           main] i.g.h.coapserver.CoapserverApplication   : Starting CoapserverApplication on LAPTOP-30B41TMT with PID 1536 (C:\Users\hase9\works\repositories\iot-practice\2019-08-22_coap_server\build\classes\java\main started by hase9 in C:\Users\hase9\works\repositories\iot-practice\2019-08-22_coap_server)

... (snip) ...

2019-08-23 00:39:35.334  INFO 1536 --- [           main] o.a.camel.spring.SpringCamelContext      : Apache Camel 2.24.1 (CamelContext: camel-1) started in 0.990 seconds
2019-08-23 00:39:35.402  INFO 1536 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2019-08-23 00:39:35.409  INFO 1536 --- [           main] i.g.h.coapserver.CoapserverApplication   : Started CoapserverApplication in 8.453 seconds (JVM running for 9.479)
<=========----> 75% EXECUTING [1m 17s]
> :bootRun
```

## Send request

coap-cli <https://www.npmjs.com/package/coap-cli> をインストールする。
```
$ npm install coap-cli -g
```

CoAP のリクエストを送信する。
```
$ coap get coap://127.0.0.1/devices
(2.05)  { "foo": "bar" }
$ coap get coap://127.0.0.1/devices/dev123
(2.05)  Hello dev123
$ echo "xxx" | coap post coap://127.0.0.1/devices/123
(2.05)  Updated 123
```
