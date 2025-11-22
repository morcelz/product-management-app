package com.morcel.productmanagement.service;

import com.morcel.productmanagement.entity.Product;
import com.morcel.productmanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    public List<Product> getAllProducts() {
        return productRepository.findAllOrderByCreatedAtDesc();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        // Verify category exists
        categoryService.getCategoryById(product.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());

        if (productDetails.getCategory() != null) {
            categoryService.getCategoryById(productDetails.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(productDetails.getCategory());
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public List<Product> searchProducts(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> getProductsByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }
}