package com.carvajal.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carvajal.models.Product;
import com.carvajal.payload.request.ProductRequest;
import com.carvajal.repository.ProductRepository;
import com.carvajal.services.ProductServices;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController

@RequestMapping("/api/products")
public class ProductController{

	@Autowired(required = true)
	ProductRepository productService;
	
	@GetMapping("/all")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public List<Product> getAll(){
		
		return  productService.findAll();
	}
	@GetMapping("/:id")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public Product getById(@PathParam("id") Long id) {
		return productService.findById(id).get();
	}
	@PostMapping("/create")
	public Product create(@Valid @RequestBody ProductRequest request) {
		Product prod = new Product();
		prod.setNombre(request.getNombre());
		prod.setDescripcion(request.getDescripcion());
		prod.setPrecio(request.getPrecio());
		prod.setCantidad(request.getCantidad());
		
		return productService.save(prod);
	}
	@PostMapping("/update")
	public Product update(@Valid @RequestBody ProductRequest request) {
		Product prod = productService.findById(request.getId()).get();
		prod.setNombre(request.getNombre());
		prod.setDescripcion(request.getDescripcion());
		prod.setPrecio(request.getPrecio());
		prod.setCantidad(request.getCantidad());
		
		return productService.save(prod);
	}
}
