package io.github.hasegawasatoshi.coapserver;

import java.util.HashMap;
import java.util.Map;

import org.apache.camel.component.cbor.CBORDataFormat;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

@Component
public class DeviceRoute extends RouteBuilder {
    private static final Integer COAP_PORT = 5683;

    private static final String COAP_RESPONSE = "{ \"foo\": \"bar\" }";

    @Override
    public void configure() throws Exception {
        restConfiguration().component("coap").port(COAP_PORT);

        CBORDataFormat spec = new CBORDataFormat();
        spec.useMap();

        rest("/devices")
            .get().to("direct:get-device-list")
            .get("/{id}").to("direct:get-device-info")
            .post("/{id}")
                .to("log:test-log")
                .to("direct:update-device-info");
        
        from("direct:get-device-list").process(exchange -> {
            exchange.getOut().setBody(COAP_RESPONSE, String.class);
        });

        from("direct:get-device-info").process(exchange -> {
            String id = exchange.getIn().getHeader("id", String.class);
            exchange.getOut().setBody("Hello " + id);
        });

        from("direct:update-device-info")
            .unmarshal(spec)
            .to("log:coap-server")
            .process(exchange -> {
                String id = exchange.getIn().getHeader("id", String.class);
                exchange.getOut().setBody("Updated " + id);
                System.out.println(exchange.getOut());
            });
    }
}
