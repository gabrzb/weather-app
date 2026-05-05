package com.clima.api;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class ClimaApiApplication {

    private static final List<Path> ENV_FILES = List.of(
            Paths.get("backend-java", ".env"),
            Paths.get(".env"),
            Paths.get("backend", ".env"));

    public static void main(String[] args) {
        loadEnvFiles();
        SpringApplication.run(ClimaApiApplication.class, args);
    }

    private static void loadEnvFiles() {
        for (Path file : ENV_FILES) {
            if (!Files.isRegularFile(file)) {
                continue;
            }

            final List<String> lines;
            try {
                lines = Files.readAllLines(file, StandardCharsets.UTF_8);
            } catch (IOException exception) {
                throw new IllegalStateException("Nao foi possivel ler o arquivo de ambiente: " + file, exception);
            }

            for (String rawLine : lines) {
                String line = rawLine.trim();
                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }

                int separator = line.indexOf('=');
                if (separator <= 0) {
                    continue;
                }

                String key = line.substring(0, separator).trim();
                String value = line.substring(separator + 1).trim();

                if (key.isEmpty() || System.getenv(key) != null || System.getProperty(key) != null) {
                    continue;
                }

                if (value.length() >= 2
                        && ((value.startsWith("\"") && value.endsWith("\""))
                        || (value.startsWith("'") && value.endsWith("'")))) {
                    value = value.substring(1, value.length() - 1);
                }

                System.setProperty(key, value);
            }
        }
    }
}
