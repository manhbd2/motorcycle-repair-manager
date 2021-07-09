package com.doan.maintenancecard.report.accessories_report;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AccessoriesReport {

    private Long id;
    private String code;
    private String name;
    private int quantity;
    private int countProduct = 0;
    private BigDecimal revenue = new BigDecimal(0);
    private Long productId;
}
