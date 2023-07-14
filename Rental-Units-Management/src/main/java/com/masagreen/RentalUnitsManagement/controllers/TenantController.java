package com.masagreen.RentalUnitsManagement.controllers;

import com.masagreen.RentalUnitsManagement.dtos.tenant.StatusUpdateReqDto;
import com.masagreen.RentalUnitsManagement.dtos.tenant.TenantReqDto;
import com.masagreen.RentalUnitsManagement.dtos.tenant.TenantsResponseDto;
import com.masagreen.RentalUnitsManagement.models.Tenant;
import com.masagreen.RentalUnitsManagement.services.TenantService;
import com.masagreen.RentalUnitsManagement.utils.ProcessResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/tenants")
@Tag(name="tenants")
@CrossOrigin({"http://localhost:5173"})
public class TenantController {
    @Autowired
    private TenantService tenantService;


    @GetMapping(  produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllTenants(){

        try{
            return new ResponseEntity<>(TenantsResponseDto.builder().tenants(
                    tenantService.findAllTenants()).build(), HttpStatus.OK
            );
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @GetMapping("/download/allTenants")
    public ResponseEntity<?> downloadAllTenants(HttpServletResponse response) {
        try {
            List<Tenant> tenants = tenantService.findAllTenants();

            HttpServletResponse httpServletResponse = ProcessResponse.processResponse(response);

            tenantService.generate(httpServletResponse, "AllTenants", tenants);

            return new ResponseEntity<>("{\"message\": \"downloading\"}", HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/withArrears")
    public ResponseEntity<?> getAllTenantsWithArrears(){
        try{
            return new ResponseEntity<>(TenantsResponseDto.builder().tenants(
                    tenantService.findAllTenants().stream()
                            .filter(tenant->"unpaid".equalsIgnoreCase(tenant.getPayStatus()))
                            .toList()).build()
                    , HttpStatus.OK
            );
        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @PostMapping
    public ResponseEntity<String> registerTenant(@RequestBody TenantReqDto tenantReqDto){

           try {
               Tenant tenant = tenantService.saveTenant(tenantReqDto);
               if (tenant != null) {
                   return new ResponseEntity<>("{\"message\": \"successfully created\"}", HttpStatus.CREATED);
               } else {
                   return new ResponseEntity<>("{\"message\": \"unit already occupied/doesn't exist\"}", HttpStatus.CREATED);
               }
           }catch (Exception e){
               e.printStackTrace();
           }
           return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @DeleteMapping("/deleteTenant/{id}")
    public ResponseEntity<String>  deleteTenant(@PathVariable("id") String id){
        try{
            String res = tenantService.deleteTenant(id);
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

    @GetMapping("/getByPhone/{id}")
    public ResponseEntity<?> findByName(@PathVariable("id") String id){

        try{
            Optional<Tenant> tenant = tenantService.findByPhone(id);
            if(tenant.isPresent()) {
                return new ResponseEntity<>(tenant, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("{\"message\": \"phone doesn't exist\"}", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PostMapping("/updatePaymentStatus")
    public ResponseEntity<?> updatePaymentStatus(@RequestBody StatusUpdateReqDto statusUpdateReqDto){
        try{
            Optional<Tenant> tenant = tenantService.findByTenantId(Long.parseLong(statusUpdateReqDto.getId()));
            if(tenant.isPresent()) {
                tenant.get().setPayStatus(statusUpdateReqDto.getPayStatus());
                tenantService.saveTenant(tenant.get());
                return new ResponseEntity<>(tenant, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("{\"message\": \"id doesn't exist\"}", HttpStatus.NOT_FOUND);
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>("{\"message\": \"internal server error\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
