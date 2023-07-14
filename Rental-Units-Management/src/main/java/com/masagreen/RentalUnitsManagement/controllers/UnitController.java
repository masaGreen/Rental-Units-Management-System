package com.masagreen.RentalUnitsManagement.controllers;

import com.masagreen.RentalUnitsManagement.dtos.unit.UnitDataResponseDto;
import com.masagreen.RentalUnitsManagement.dtos.unit.UnitReqDto;
import com.masagreen.RentalUnitsManagement.models.Unit;
import com.masagreen.RentalUnitsManagement.services.UnitService;
import com.masagreen.RentalUnitsManagement.utils.ProcessResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/units")
@Tag(name="units")
@CrossOrigin({"http://localhost:5173"})
public class UnitController {
    @Autowired
    private UnitService unitService;

    @PostMapping()
    public ResponseEntity<String> rentUnit(@RequestBody UnitReqDto unitReqDto){
        Unit unit = Unit.builder()
                .plotName(unitReqDto.getPlotName())
                .unitNumber(unitReqDto.getUnitNumber())
                .tag(unitReqDto.getTag())
                .status(false)
                .rent(unitReqDto.getRent())
                .build();

        try {
            if (unit != null) {
                unitService.saveUnit(unit);
                return new ResponseEntity<>("{\"message\": \"successfully created\"}", HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("{\"message\": \"unit already exists\"}", HttpStatus.CREATED);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping
    public ResponseEntity<?> getUnits(){
        try{
            List<Unit> units = unitService.findAllUnits();
            return new ResponseEntity<>(UnitDataResponseDto.builder().units(units).build(),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/download/allUnits")
    public ResponseEntity<?> downloadAllTenants(HttpServletResponse response) {
        try {
            List<Unit> units = unitService.findAllUnits();

            HttpServletResponse httpServletResponse = ProcessResponse.processResponse(response);

            unitService.generate(httpServletResponse, "AllUnits", units);

            return new ResponseEntity<>("{\"message\": \"downloading\"}", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getSingleUnit/{id}")
    public ResponseEntity<?>  getSingleUnit(@PathVariable("id") String id){
        try{
            Optional<Unit> unit = unitService.getSingleUnit(id);
            if(unit.isPresent()) {
                return new ResponseEntity<>(unit, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("{\"message\": \"id doesn't exist\"}", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getByUnitNumber/{unitNumber}")
    public ResponseEntity<?> findByName(@PathVariable("unitNumber") String unitNum){
        try{
            Optional<Unit> unit = unitService.findByUnitNumber(unitNum);
            if(unit.isPresent()) {
                return new ResponseEntity<>(unit.get(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>("{\"message\": \"name doesn't exist\"}", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/updateUnitStatus/{id}")
    public ResponseEntity<?> updateAvailability(@PathVariable("id") String id){
        try{
            Optional<Unit> unit = unitService.getSingleUnit(id);
            if(unit.isPresent()) {
                unit.get().setStatus(!unit.get().isStatus());
                unitService.saveUnit(unit.get());
                return new ResponseEntity<>("{\"message\": \"status successfully changed\"}", HttpStatus.NOT_FOUND);
            }else{
                return new ResponseEntity<>("{\"message\": \"id doesn't exist\"}", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @DeleteMapping("/reset/{id}")
    public ResponseEntity<String>  deleteUnit(@PathVariable("id") String id){
        try{
            String res = unitService.deleteUnit(id);
            if(res==null) {
                return new ResponseEntity<>("{\"message\": \"successfully deleted\"}", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("{\"message\": \"id doesn't exist\"}", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
