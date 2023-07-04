package com.carvajal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carvajal.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
	Boolean existsByNombre(String Nombre);
}
