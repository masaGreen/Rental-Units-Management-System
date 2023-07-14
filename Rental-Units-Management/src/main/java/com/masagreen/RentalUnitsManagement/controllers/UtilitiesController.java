package com.masagreen.RentalUnitsManagement.controllers;

import com.masagreen.RentalUnitsManagement.dtos.utils.UtilsReqDto;
import com.masagreen.RentalUnitsManagement.dtos.utils.UtilsResDto;
import com.masagreen.RentalUnitsManagement.models.UtilitiesPayments;
import com.masagreen.RentalUnitsManagement.services.UtilitiesPaymentsService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.masagreen.RentalUnitsManagement.utils.ProcessResponse.processResponse;

@RestController
@RequestMapping("/v1/utilities")
@Tag(name="utilities")
public class UtilitiesController {
    @Autowired
    private UtilitiesPaymentsService utilitiesPaymentsService;

    @PostMapping()
    public ResponseEntity<String> saveUtilityPayment(@RequestBody UtilsReqDto utilsReqDto){


        try {
            UtilitiesPayments utilitiesPayment = utilitiesPaymentsService.saveUtilitiesPayments(utilsReqDto);
            if (utilitiesPayment != null) {

                return new ResponseEntity<>("{\"message\": \"successfully created\"}", HttpStatus.CREATED);
            }else{
                return new ResponseEntity<>("{\"message\": \"can't create utilities payments for non-existent unit\"}", HttpStatus.CREATED);
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/download/allUtilPayments")
    public ResponseEntity<?> downloadAllUtilsPayments(HttpServletResponse response) {
        try {
            List<UtilitiesPayments> allUtils = utilitiesPaymentsService.getAllUtils();
            for(UtilitiesPayments utilitiesPayments:allUtils){
                System.out.println(utilitiesPayments.getId());
            }
            HttpServletResponse httpServletResponse = processResponse(response);

            utilitiesPaymentsService.generate(httpServletResponse, "AllUtilitiesPayments", allUtils);

            return new ResponseEntity<>("{\"message\": \"downloading\"}", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/download/allUtilPaymentsWithPendingBills")
    public ResponseEntity<?> downloadAllUtilsPaymentsWithPendingBills(HttpServletResponse response) {
        try {
            List<UtilitiesPayments> allUtils = utilitiesPaymentsService.getAllUtils()
                    .stream()
                    .filter(util->"unpaid".equalsIgnoreCase(util.getStatus()))
                    .collect(Collectors.toList());

            HttpServletResponse httpServletResponse = processResponse(response);

           utilitiesPaymentsService.generate(httpServletResponse, "AllUtilitiesPayments", allUtils);

            return new ResponseEntity<>("{\"message\": \"downloading\"}", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/download/allUtilPaymentsPerUnit/{unitNumber}")
    public ResponseEntity<?> downloadAllUtilsPaymentsForSingleUnit(@PathVariable("unitNumber") String unitNumber, HttpServletResponse response) {
        try {
            List<UtilitiesPayments> utilPayments = utilitiesPaymentsService.findByUnitNumber(unitNumber);

            HttpServletResponse httpServletResponse = processResponse(response);

            utilitiesPaymentsService.generate(httpServletResponse, "AllUtilitiesPayments", utilPayments);

            return new ResponseEntity<>("{\"message\": \"downloading\"}", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping
    public ResponseEntity<?> getAllUtilsPayments(){
        try{
            return new ResponseEntity<>(UtilsResDto.builder()
                    .utilsPayments(utilitiesPaymentsService.getAllUtils())
                    .build(), HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/getByUnit/{unitNumber}")
    public ResponseEntity<?> findByUnitNumber(@PathVariable("unitNumber") String unitNumber){
        try{
            List<UtilitiesPayments> utilPayments = utilitiesPaymentsService.findByUnitNumber(unitNumber);
            if(!utilPayments.isEmpty()) {
                return new ResponseEntity<>(UtilsResDto.builder().utilsPayments(utilPayments).build(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>("{\"message\": \"unit doesn't exist\"}", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/getByStatus/{status}")
    public ResponseEntity<?> findByUnitWithArrears(@PathVariable("status") String status){
        try{
            List<UtilitiesPayments> utilPayments = utilitiesPaymentsService.findByStatus(status)
                    .stream()
                    .filter(util->"unpaid".equalsIgnoreCase(util.getStatus()))
                    .collect(Collectors.toList());

            if(!utilPayments.isEmpty()) {
                return new ResponseEntity<>(UtilsResDto.builder().utilsPayments(utilPayments).build(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>("{\"message\": \"all unit bills paid\"}", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @DeleteMapping("/deleteUtilities/{id}")
    public ResponseEntity<String>  deleteUtility(@PathVariable("id") String id){
        try{
            String res = utilitiesPaymentsService.deleteUtility(id);
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
