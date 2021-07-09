package com.doan.customer.controller;

import com.doan.customer.dto.main.VehicleDTO;
import com.doan.customer.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("admin")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping("vehicles/{customerId}")
    public ResponseEntity<Object> getAllByCustomer(
            @PathVariable("customerId") Long customerId) {
        List<VehicleDTO> vehicleDTOS = vehicleService.getListVehicleByCustomer(customerId);
        return ResponseEntity.ok(vehicleDTOS);
    }

}
