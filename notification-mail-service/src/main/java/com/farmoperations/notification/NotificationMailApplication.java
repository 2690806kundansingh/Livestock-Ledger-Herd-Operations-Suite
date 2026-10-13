// File: notification-mail-service/src/main/java/com/farmoperations/notification/NotificationMailApplication.java
package com.farmoperations.notification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NotificationMailApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotificationMailApplication.class, args);
    }
}
