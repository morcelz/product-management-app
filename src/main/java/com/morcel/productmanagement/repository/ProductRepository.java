package com.morcel.productmanagement.repository;

import com.morcel.productmanagement.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByNameContainingIgnoreCase(String name);

    @Query("SELECT p FROM Product p ORDER BY p.createdAt DESC")
    List<Product> findAllOrderByCreatedAtDesc();

    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
}