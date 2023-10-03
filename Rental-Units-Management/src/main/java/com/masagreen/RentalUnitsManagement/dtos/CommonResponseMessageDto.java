package com.masagreen.RentalUnitsManagement.dtos;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommonResponseMessageDto {
    private String message;
}
