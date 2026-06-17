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
                "Welcome to Bank Management System");

        message.setText(
                "Hello " + username + ",\n\n" +
                "Welcome to Bank Management System.\n\n" +
                "Your account has been created successfully.\n\n" +
                "Account Number: " + accountNumber + "\n\n" +
                "Thank you for banking with us.\n\n" +
                "Regards,\n" +
                "Bank Management Team"
        );

        mailSender.send(message);
    }
}
