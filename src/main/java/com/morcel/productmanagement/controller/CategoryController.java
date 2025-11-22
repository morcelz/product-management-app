package com.morcel.productmanagement.controller;

import com.morcel.productmanagement.entity.Category;
import com.morcel.productmanagement.service.CategoryService;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Path("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCategoryById(@PathParam("id") Long id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        if (category.isPresent()) {
            return Response.ok(category.get()).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Category createCategory(@Valid Category category) {
        return categoryService.createCategory(category);
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateCategory(@PathParam("id") Long id, @Valid Category categoryDetails) {
        try {
            Category updatedCategory = categoryService.updateCategory(id, categoryDetails);
            return Response.ok(updatedCategory).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCategory(@PathParam("id") Long id) {
        try {
            categoryService.deleteCategory(id);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}