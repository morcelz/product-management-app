package com.morcel.productmanagement.controller;

import com.morcel.productmanagement.entity.Product;
import com.morcel.productmanagement.service.ProductService;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@Path("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProductById(@PathParam("id") Long id) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isPresent()) {
            return Response.ok(product.get()).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Product createProduct(@Valid Product product) {
        return productService.createProduct(product);
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateProduct(@PathParam("id") Long id, @Valid Product productDetails) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);
            return Response.ok(updatedProduct).build();
        } catch (RuntimeException e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteProduct(@PathParam("id") Long id) {
        try {
            productService.deleteProduct(id);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @GET
    @Path("/category/{categoryId}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> getProductsByCategory(@PathParam("categoryId") Long categoryId) {
        return productService.getProductsByCategory(categoryId);
    }

    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> searchProducts(@QueryParam("name") String name) {
        return productService.searchProducts(name);
    }

    @GET
    @Path("/price-range")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Product> getProductsByPriceRange(
            @QueryParam("minPrice") Double minPrice,
            @QueryParam("maxPrice") Double maxPrice) {
        return productService.getProductsByPriceRange(minPrice, maxPrice);
    }
}