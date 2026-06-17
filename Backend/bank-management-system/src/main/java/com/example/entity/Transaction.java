package com.example.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Transaction {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionType;

    private String transactionId;

    private Double amount;

    private String description;

    private LocalDate transactionDate;

    private String senderAccount;

    private String receiverAccount;

    private Double balanceAfterTransaction;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
