package com.example.dto;

import java.util.List;

import com.example.entity.Transaction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecentTransactionDto {

	private List<Transaction> list;
	private int totalTransation;
	private double totalDeposit;
	private double totalWithdraw;
	private double totalTransfer;
}
