package com.hms.healthmgmtsvc.Services;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

public class FHIRService {

    public Map<String, Object> GetPatientData() throws IOException, ExecutionException, InterruptedException {

        var client = HttpClient.newHttpClient();

        var request = HttpRequest.newBuilder(
                URI.create("https://hapi.fhir.org/baseR4/Patient"))
                .header("accept", "application/json")
                .GET()
                .build();

        var responseFuture = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

        Map<String, Object> result = new ObjectMapper().readValue(responseFuture.get().body(), HashMap.class);

        return result;
    }

    public Map<String, Object> GetObservationData() throws IOException, ExecutionException, InterruptedException {

        var client = HttpClient.newHttpClient();

        var request = HttpRequest.newBuilder(
                        URI.create("https://hapi.fhir.org/baseR4/Observation"))
                .header("accept", "application/json")
                .GET()
                .build();

        var responseFuture = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

        Map<String, Object> result = new ObjectMapper().readValue(responseFuture.get().body(), HashMap.class);

        return result;
    }
}
