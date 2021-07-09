package com.doan.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDTO extends BaseDTO {

    private String name;
    private String phone;
    private String code;
    private String email;
}
