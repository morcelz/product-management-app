package com.morcel.productmanagement.controller;

import com.morcel.productmanagement.entity.User;
import com.morcel.productmanagement.service.UserService;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Path("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserById(@PathParam("id") Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(u -> Response.ok(u).build())
                .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(@Valid User user) {
        try {
            User createdUser = userService.createUser(user);
            return Response.ok(createdUser).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@PathParam("id") Long id, @Valid User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return Response.ok(updatedUser).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteUser(@PathParam("id") Long id) {
        try {
            userService.deleteUser(id);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}