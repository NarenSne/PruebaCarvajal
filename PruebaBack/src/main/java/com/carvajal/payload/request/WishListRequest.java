package com.carvajal.payload.request;

import jakarta.validation.constraints.NotBlank;

public class WishListRequest {
	
	private Long id;
	@NotBlank
	private Long productId;
	@NotBlank
	private Long userId;
	@NotBlank
	private String status;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
