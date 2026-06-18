package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendWelcomeEmail(
            String toEmail,
            String username,
            String accountNumber) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "Welcome to Bank Management System - Account Created Successfully");

        message.setText(
                "Dear " + username + ",\n\n" +

                "Welcome to Bank Management System.\n\n" +

                "We are pleased to inform you that your account has been created successfully.\n\n" +

                "Account Number : " + accountNumber + "\n\n" +

                "You can now log in and access banking services such as:\n" +
                "- Deposit Money\n" +
                "- Withdraw Money\n" +
                "- Transfer Money\n" +
                "- View Transaction History\n\n" +

                "Thank you for choosing our banking services.\n\n" +

                "Regards,\n" +
                "Bank Management Team"
        );

        mailSender.send(message);
    }
    
    
    
    
    public void sendDepositEmail(
            String toEmail,
            String username,
            String accountNumber,
            double amount,
            double balance) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "Deposit Successful");

        message.setText(
                "Dear " + username + ",\n\n" +

                "Your deposit transaction has been completed successfully.\n\n" +

                "Account Number : " + accountNumber + "\n" +

                "Deposited Amount : ₹" + amount + "\n" +

                "Available Balance : ₹" + balance + "\n\n" +

                "Thank you for banking with us.\n\n" +

                "Regards,\n" +
                "Bank Management Team"
        );

        mailSender.send(message);
    }
    
    
    
    
    
    
    
    public void sendWithdrawEmail(
            String toEmail,
            String username,
            String accountNumber,
            double amount,
            double balance) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "Withdrawal Successful");

        message.setText(
                "Dear " + username + ",\n\n" +

                "Your withdrawal transaction has been completed successfully.\n\n" +

                "Account Number : " + accountNumber + "\n" +

                "Withdraw Amount : ₹" + amount + "\n" +

                "Available Balance : ₹" + balance + "\n\n" +

                "Thank you for banking with us.\n\n" +

                "Regards,\n" +
                "Bank Management Team"
        );

        mailSender.send(message);
    }
    
    
    
    
    public void sendTransferEmail(
            String toEmail,
            String username,
            String receiverName,
            double amount,
            double balance) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "Transaction Alert - Money Transfer Successful");

        message.setText(
                "Dear " + username + ",\n\n" +

                "Your transfer transaction has been completed successfully.\n\n" +

                "Transaction Details\n" +
                "-------------------------\n" +
                
                "Transferred To : " + receiverName + "\n" +
                "Amount : ₹" + amount + "\n" +
                "Available Balance : ₹" + balance + "\n\n" +

                "If you did not authorize this transaction, please contact customer support immediately.\n\n" +

                "Regards,\n" +
                "Bank Management Team"
        );

        mailSender.send(message);
    }
    
    
    
    
    
    
    
    
    public void sendReceiveEmail(
            String toEmail,
            String username,
            String senderName,
            double amount,
            double balance) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(toEmail);

        message.setSubject(
                "Transaction Alert - Amount Credited");

        message.setText(
                "Dear " + username + ",\n\n" +

                "An amount has been credited to your account.\n\n" +

                "Transaction Details\n" +
                "-------------------------\n" +
                
                "Received From : " + senderName + "\n" +
                "Amount Credited : ₹" + amount + "\n" +
                "Available Balance : ₹" + balance + "\n\n" +

                "Thank you for banking with us.\n\n" +

                "Regards,\n" +
                "Bank Management Team"
        );

        mailSender.send(message);
    }
}
