package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long>{

	List<Transaction> findTop4ByUserIdOrderByIdDesc(Long userId);

    List<Transaction> findByUserId(Long userId);

	List<Transaction> findTop10ByUserIdOrderByIdDesc(Long userId);






}
