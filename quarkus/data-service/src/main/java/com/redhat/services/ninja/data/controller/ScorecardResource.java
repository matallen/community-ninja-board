package com.redhat.services.ninja.data.controller;

import com.redhat.services.ninja.entity.Scorecard;
import com.redhat.services.ninja.data.service.DatabaseEngine;
import com.redhat.services.ninja.data.operation.IdentifiableDatabaseOperations;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/data/scorecard")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ScorecardResource extends AbstractIdentifiableResource<String, Scorecard, IdentifiableDatabaseOperations<String, Scorecard>> {
    @Inject
    DatabaseEngine engine;

    @Override
    public DatabaseEngine getEngine() {
        return engine;
    }

    @Override
    public IdentifiableDatabaseOperations<String, Scorecard> getOperations() {
        return engine.getScorecardOperations();
    }
}
