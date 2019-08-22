package io.github.hasegawasatoshi.coapserver;

import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

import org.eclipse.californium.core.coap.CoAP.ResponseCode;
import org.apache.camel.coap.CoAPConstants;

@Component
public class DeviceRoute extends RouteBuilder {
    private static final Integer COAP_PORT = 5683;

    private static final String COAP_RESPONSE = "{ \"foo\": \"bar\" }";

    @Override
    public void configure() throws Exception {
        restConfiguration().component("coap").port(COAP_PORT);

        rest("/devices")
            .get().to("direct:get-device-list")
            .get("/{id}").to("direct:get-device-info")
            .post("/{id}").to("direct:update-device-info");
        
        from("direct:get-device-list").process(exchange -> {
            exchange.getOut().setBody(COAP_RESPONSE, String.class);
        });

        from("direct:get-device-info").process(exchange -> {
            String id = exchange.getIn().getHeader("id", String.class);
            exchange.getOut().setBody("Hello " + id);
        });

        from("direct:update-device-info").process(exchange -> {
            String id = exchange.getIn().getHeader("id", String.class);
            exchange.getOut().setBody("Updated " + id);
            // How can I set a CoAP response code? Below does not work well. CoAP client receives 2.05.
            // exchange.getOut().setHeader(CoAPConstants.COAP_RESPONSE_CODE, ResponseCode.CONTINUE);
            // exchange.getOut().setHeader(CoAPConstants.COAP_RESPONSE_CODE, constant("2.31"));
            // System.out.println(exchange.getOut().getHeader(CoAPConstants.COAP_RESPONSE_CODE));
        });

    }
}
