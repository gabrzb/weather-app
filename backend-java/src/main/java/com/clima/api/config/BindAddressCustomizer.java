package com.clima.api.config;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class BindAddressCustomizer implements WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {

    private final Environment environment;

    public BindAddressCustomizer(Environment environment) {
        this.environment = environment;
    }

    @Override
    public void customize(ConfigurableServletWebServerFactory factory) {
        String bindAddress = environment.getProperty("BIND_ADDRESS", "127.0.0.1:8081").trim();
        int separator = bindAddress.lastIndexOf(':');

        if (separator <= 0 || separator == bindAddress.length() - 1) {
            throw new IllegalStateException("BIND_ADDRESS invalido. Use o formato host:porta.");
        }

        String host = bindAddress.substring(0, separator).trim();
        String portRaw = bindAddress.substring(separator + 1).trim();
        int port;
        try {
            port = Integer.parseInt(portRaw);
        } catch (NumberFormatException exception) {
            throw new IllegalStateException("BIND_ADDRESS invalido. Porta nao numerica: " + portRaw, exception);
        }

        if (port <= 0 || port > 65535) {
            throw new IllegalStateException("BIND_ADDRESS invalido. Porta fora do intervalo permitido.");
        }

        try {
            factory.setAddress(InetAddress.getByName(host));
        } catch (UnknownHostException exception) {
            throw new IllegalStateException("BIND_ADDRESS invalido. Host nao resolvido: " + host, exception);
        }

        factory.setPort(port);
    }
}
