package com.masagreen.RentalUnitsManagement.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class AuthReqBodyDto {
    @Email(message = "invalid email")
    private String email;
    @Size(min=6)
    private String password;
}
