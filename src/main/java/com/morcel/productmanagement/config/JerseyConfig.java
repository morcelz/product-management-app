package com.morcel.productmanagement.config;

import com.morcel.productmanagement.controller.UserController;
import com.morcel.productmanagement.controller.CategoryController;
import com.morcel.productmanagement.controller.ProductController;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

@Component
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        // Register your JAX-RS controllers
        register(UserController.class);
        register(CategoryController.class);
        register(ProductController.class);
        register(com.morcel.productmanagement.controller.AuthController.class);
        
        // Register CORS filter
        register(CorsFilter.class);

        // Enable Jackson for JSON
        packages("com.morcel.productmanagement.controller");
    }
}