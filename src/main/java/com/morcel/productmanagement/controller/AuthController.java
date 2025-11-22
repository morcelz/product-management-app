package com.morcel.productmanagement.controller;

import com.morcel.productmanagement.dto.LoginRequest;
import com.morcel.productmanagement.dto.LoginResponse;
import com.morcel.productmanagement.entity.User;
import com.morcel.productmanagement.service.UserService;
import com.morcel.productmanagement.util.JwtUtil;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@Path("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(LoginRequest loginRequest) {
        try {
            if (loginRequest.getUsername() == null || loginRequest.getPassword() == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\":\"Username and password are required\"}")
                        .build();
            }

            Optional<User> userOpt = userService.getUserByUsername(loginRequest.getUsername());
            
            if (userOpt.isEmpty()) {
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity("{\"error\":\"Invalid credentials\"}")
                        .build();
            }

            User user = userOpt.get();
            
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity("{\"error\":\"Invalid credentials\"}")
                        .build();
            }

            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
            LoginResponse response = new LoginResponse(
                    token,
                    user.getUsername(),
                    user.getEmail(),
                    user.getRole(),
                    user.getId()
            );

            return Response.ok(response).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Login failed: " + e.getMessage() + "\"}")
                    .build();
        }
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(User user) {
        try {
            User createdUser = userService.createUser(user);
            String token = jwtUtil.generateToken(createdUser.getUsername(), createdUser.getRole());
            LoginResponse response = new LoginResponse(
                    token,
                    createdUser.getUsername(),
                    createdUser.getEmail(),
                    createdUser.getRole(),
                    createdUser.getId()
            );
            return Response.ok(response).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Registration failed: " + e.getMessage() + "\"}")
                    .build();
        }
    }
}
