package com.masagreen.RentalUnitsManagement.dtos.tenant;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TenantReqDto {
    @Size(max=12, message="must not be longer than 12 ")
    @NotBlank(message="name cannot be empty")
    private String firstName;

    @Size(max=12, message="must not be longer than 12 ")
    @NotBlank(message="name cannot be empty")
    private String lastName;

    @Pattern(regexp = "^0[0-9]{9}$", message = "invalid phone number")
    private String phone;
    @NotBlank(message = "unitNumber must not be empty")
    private String unitNumber;


}
