package com.masagreen.RentalUnitsManagement.controllers;

import com.masagreen.RentalUnitsManagement.dtos.CommonResponseMessageDto;

import com.masagreen.RentalUnitsManagement.dtos.unit.UnitDataResponseDto;
import com.masagreen.RentalUnitsManagement.dtos.unit.UnitReqDto;
import com.masagreen.RentalUnitsManagement.jwt.JwtFilter;
import com.masagreen.RentalUnitsManagement.models.Unit;
import com.masagreen.RentalUnitsManagement.services.UnitService;
import com.masagreen.RentalUnitsManagement.utils.ProcessDownloadResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/units")
@Tag(name = "units")
@Slf4j
@SecurityRequirement(name = "bearerAuth")
@CrossOrigin("http://localhost:5173")
public class UnitController {
    @Autowired
    private UnitService unitService;
    @Autowired
    private JwtFilter jwtFilter;
    @PostMapping()
    public ResponseEntity<?> rentUnit( @RequestBody @Valid UnitReqDto unitReqDto){
     
        Unit unit = Unit.builder()
                .plotName(unitReqDto.getPlotName())
                .unitNumber(unitReqDto.getPlotName()+unitReqDto.getUnitNumber())
                .tag(unitReqDto.getTag())
                .status(true)
                .rent(unitReqDto.getRent())
                .build();

        try {
            Unit unitToBeSaved = unitService.saveUnit(unit);
            System.out.println(unitToBeSaved);
            if (unitToBeSaved  != null) {
                return new ResponseEntity<>(CommonResponseMessageDto.builder().message("successfully created").build(), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>(CommonResponseMessageDto.builder().message("unit already exists").build(), HttpStatus.CONFLICT);
            }
        } catch (Exception e){
           log.error(e.getLocalizedMessage());
            return new ResponseEntity<>(CommonResponseMessageDto.builder().message("internal server error").build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping
    public ResponseEntity<?> getUnits(){
        try{
            List<Unit> units = unitService.findAllUnits();
            return new ResponseEntity<>(UnitDataResponseDto.builder().units(units).build(),HttpStatus.OK);
        }catch (Exception e){
           log.error(e.getLocalizedMessage());
            return new ResponseEntity<>(CommonResponseMessageDto.builder().message("internal server error").build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/download/allUnits")
    public ResponseEntity<?> downloadAllTenants(HttpServletResponse response) {
        try {
            List<Unit> units = unitService.findAllUnits();

            HttpServletResponse httpServletResponse = ProcessDownloadResponse.processResponse(response);

            unitService.generate(httpServletResponse, "AllUnits", units);

            return new ResponseEntity<>(CommonResponseMessageDto.builder().message("downloading").build(), HttpStatus.OK);

        } catch (Exception e) {
           log.error(e.getLocalizedMessage());
            return new ResponseEntity<>(CommonResponseMessageDto.builder().message(e.getMessage()).build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/getAvailableUnits")
    public ResponseEntity<?>  getAvailableUnits(){
        try{
            List<Unit> units = unitService.findAllUnits().stream().filter(Unit::isStatus).toList();

            return new ResponseEntity<>(UnitDataResponseDto.builder().units(units).build(),HttpStatus.OK);
        }catch (Exception e){
           log.error(e.getLocalizedMessage());
            return new ResponseEntity<>(CommonResponseMessageDto.builder().message(e.getMessage()).build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/getByUnitNumber/{unitNumber}")
    public ResponseEntity<?> findByName(@PathVariable("unitNumber") String unitNum){
        try{
            Optional<Unit> unit = unitService.findByUnitNumber(unitNum);
            if(unit.isPresent()) {
                return new ResponseEntity<>(unit.get(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(CommonResponseMessageDto.builder().message("name doesn't exist").build(), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){
           log.error(e.getLocalizedMessage());
            return new ResponseEntity<>(CommonResponseMessageDto.builder().message(e.getMessage()).build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/updateUnitStatus")
    @Transactional
    public ResponseEntity<?> updateAvailability( @RequestBody @Valid CommonResponseMessageDto commonResponseMessageDto){
        try{
          
            Optional<Unit> unit = unitService.findByUnitNumber(commonResponseMessageDto.getMessage());
            if(unit.isPresent()) {
                Unit unitFound = unit.get();
               
                unitFound.setStatus(!(unitFound.isStatus()));
                  
               unitService.saveUnit(unitFound);
               
                return new ResponseEntity<>(CommonResponseMessageDto.builder().message("status successfully changed").build(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(CommonResponseMessageDto.builder().message("unit doesn't exist").build(), HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){
           log.error(e.getLocalizedMessage());
            return new ResponseEntity<>(CommonResponseMessageDto.builder().message(e.getMessage()).build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @DeleteMapping("/reset/{id}")
    @Transactional
    public ResponseEntity<?>  deleteUnit(@PathVariable("id") String id){
        try{
            System.out.println(jwtFilter.isAdmin());         
            if(jwtFilter.isAdmin() ) {
                unitService.deleteUnit(id);
                return new ResponseEntity<>(CommonResponseMessageDto.builder().message("successfully deleted").build(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(CommonResponseMessageDto.builder().message("Request unauthorized").build(), HttpStatus.FORBIDDEN);
            }

        }  
        
        catch (Exception e){
           log.error(e.getLocalizedMessage());
            
            return new ResponseEntity<>(CommonResponseMessageDto.builder().message("unit with tenant cannot be deleted").build(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
