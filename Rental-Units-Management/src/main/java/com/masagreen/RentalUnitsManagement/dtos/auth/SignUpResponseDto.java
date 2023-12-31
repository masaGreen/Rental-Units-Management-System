package com.masagreen.RentalUnitsManagement.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpResponseDto {
    private Long id;
    
    private String email;
   
    private String password;
    
    private boolean  status;
    
    private String role;
}
