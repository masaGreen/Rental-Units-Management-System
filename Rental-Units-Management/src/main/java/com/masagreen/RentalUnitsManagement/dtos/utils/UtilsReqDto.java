package com.masagreen.RentalUnitsManagement.dtos.utils;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UtilsReqDto {
    @Builder.Default
    private String waterBill="0";

    @Builder.Default
    private String garbage="0";

    @Builder.Default
    private String amountPaid="0";
    @NotBlank(message = "unitNumber must not be empty")
    private String unitNumber;
}

