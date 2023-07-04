package com.carvajal.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carvajal.models.Product;
import com.carvajal.repository.ProductRepository;

import jakarta.websocket.server.PathParam;

@Service
public class ProductServices {

	@Autowired
	ProductRepository productRepository;
	
	public List<Product> getAll(){
		
		return  this.productRepository.findAll();
	}
	public Product getById(Long id) {
		return productRepository.findById(id).get();
	}
}
