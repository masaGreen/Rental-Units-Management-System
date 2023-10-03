package com.masagreen.RentalUnitsManagement.dtos.tenant;

import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatusUpdateReqDto {
    @Pattern(regexp = "^0[0-9]{9}$", message = "invalid phone number")
    private String phone;
    private String payStatus;
}
