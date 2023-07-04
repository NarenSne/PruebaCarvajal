package com.carvajal.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carvajal.models.WishList;
import com.carvajal.payload.request.WishListRequest;
import com.carvajal.repository.ProductRepository;
import com.carvajal.repository.WishListRepository;

import jakarta.websocket.server.PathParam;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/wishlist")
public class WishListController {

	@Autowired(required = true)
	WishListRepository wishListRepository;
	@Autowired(required = true)
	ProductRepository productService;
	
	@GetMapping("")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public List<WishList> getByUser(@RequestParam("user")String userId){	
		System.out.println(Long.parseLong(userId));
		System.out.println(wishListRepository.findByUserId(Long.parseLong(userId)));
		return wishListRepository.getByUserId(Long.parseLong(userId));
	}
	
	@PostMapping("/add")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public WishList addByUser(@RequestParam("user")String userId,@RequestBody WishListRequest request){		
		WishList wish = new WishList();
		wish.setProductId(request.getProductId());
		wish.setUserId(request.getUserId());
		wish.setStatus("Añadido");
		return wishListRepository.save(wish);
	}
	
	@PostMapping("/remove")
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public WishList removeByUser(@RequestParam("user")String userId,@RequestBody WishListRequest request){	
		System.out.println(Long.parseLong(userId));
		System.out.println(wishListRepository.getById(request.getId()));
		WishList wish = wishListRepository.getById(request.getId());
		wish.setProductId(request.getProductId());
		wish.setUserId(request.getUserId());
		wish.setStatus("Eliminado");
		return wishListRepository.save(wish);
	}
}
