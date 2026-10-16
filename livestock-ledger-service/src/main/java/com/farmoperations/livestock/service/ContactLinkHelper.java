// File: livestock-ledger-service/src/main/java/com/farmoperations/livestock/service/ContactLinkHelper.java
package com.farmoperations.livestock.service;

import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * Service helper utility generating direct dialer and WhatsApp click-to-chat links
 * with prefilled contextual greeting messages.
 */
@Component
public class ContactLinkHelper {

    /**
     * Formats a raw phone number into a standardized tel: protocol URL.
     * Example output: "tel:+919825144021"
     */
    public String generateDirectDialUrl(String rawPhone) {
        if (rawPhone == null || rawPhone.isBlank()) {
            return "";
        }
        // Retain only '+' and digits
        String cleaned = rawPhone.replaceAll("[^0-9+]", "");
        if (!cleaned.startsWith("+")) {
            // Default to India country code if absent and starts with 10 digits
            if (cleaned.length() == 10) {
                cleaned = "+91" + cleaned;
            } else {
                cleaned = "+" + cleaned;
            }
        }
        return "tel:" + cleaned;
    }

    /**
     * Generates a WhatsApp Click-to-Chat API link with an automated greeting.
     * Example output:
     * https://wa.me/919825144021?text=Hello%20Rameshwar%2C%20I%20found%20your%20farm%20Vedic%20Gir%20Dairy%20nearby%20and%20would%20like%20to%20connect.
     */
    public String generateWhatsAppUrl(String rawPhone, String farmerName, String farmName) {
        if (rawPhone == null || rawPhone.isBlank()) {
            return "";
        }

        // WhatsApp wa.me requires country code without '+' or non-digit characters
        String digitsOnly = rawPhone.replaceAll("[^0-9]", "");
        if (digitsOnly.length() == 10) {
            digitsOnly = "91" + digitsOnly;
        }

        String safeFarmer = (farmerName != null && !farmerName.isBlank()) ? farmerName.trim() : "Farmer";
        String safeFarm = (farmName != null && !farmName.isBlank()) ? farmName.trim() : "your farm";

        String message = String.format(
            "Hello %s, I found your farm %s nearby and would like to connect.",
            safeFarmer,
            safeFarm
        );

        String encodedMessage = URLEncoder.encode(message, StandardCharsets.UTF_8)
            .replace("+", "%20"); // Clean RFC 3986 space encoding

        return String.format("https://wa.me/%s?text=%s", digitsOnly, encodedMessage);
    }
}
