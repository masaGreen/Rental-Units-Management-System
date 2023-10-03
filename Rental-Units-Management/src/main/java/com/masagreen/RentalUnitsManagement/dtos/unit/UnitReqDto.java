package com.masagreen.RentalUnitsManagement.dtos.unit;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UnitReqDto {
    @NotBlank(message = "plotName must not be empty")
    private String plotName;
    @NotBlank(message = "unitNumber must not be empty")
    private String unitNumber;
    @NotBlank(message = "tag must not be empty")
    private  String tag;

    @NotNull(message = "rent must not be empty")
    private int rent;
}

