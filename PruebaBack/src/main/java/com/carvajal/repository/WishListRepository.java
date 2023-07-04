package com.carvajal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carvajal.models.WishList;

public interface WishListRepository extends JpaRepository<WishList, Long> {
	@Query(value = "SELECT * FROM wish_list AS w WHERE w.user_id = ? AND w.status = 'Añadido'",nativeQuery = true)
	List<WishList> getByUserId(Long id);
	@Query(value = "SELECT * FROM wish_list AS w WHERE w.user_id = ? AND w.status = 'Eliminado'",nativeQuery = true)
	List<WishList> getDeletedByUserId(Long id);
	List<WishList> findByUserId(Long id);
	@Query(value = "SELECT * FROM wish_list AS w WHERE w.id = ?",nativeQuery = true)
	WishList getById(Long id);
}
