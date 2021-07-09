package com.doan.maintenancecard.kafka;

import com.doan.maintenancecard.entity.MaintenanceCard;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SendMessage {

    private final ObjectMapper json;
    private final KafkaTemplate<String, String> kafkaTemplate;
    private static final String TOPIC_PRODUCT = "58ofg9e4-product";
    private static final String TOPIC_CUSTOMER = "58ofg9e4-customer";
    private static final String TOPIC_USER = "58ofg9e4-user";

    public void sendToProduct(ProductModel product, String key) {
        try {
            String message = json.writeValueAsString(product);
            kafkaTemplate.send(TOPIC_PRODUCT, key, message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    //lưu thông tin xe
    public void sendToCustomer(MaintenanceCard maintenanceCard) {
        VehicleModel vehicleModel = new VehicleModel();
        vehicleModel.setColor(maintenanceCard.getColor());
        vehicleModel.setModel(maintenanceCard.getModel());
        vehicleModel.setPlateNumber(maintenanceCard.getPlatesNumber());
        try {
            String message = json.writeValueAsString(vehicleModel);
            kafkaTemplate.send(TOPIC_CUSTOMER, String.valueOf(maintenanceCard.getCustomerId()), message);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    //cập nhật số phiếu cho nhân viên
    public void sendToUser(String key, String value) {
        kafkaTemplate.send(TOPIC_USER, key, value);
    }

}
