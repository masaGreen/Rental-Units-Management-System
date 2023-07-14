package com.masagreen.RentalUnitsManagement.utils;



import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.util.UUID;


import jakarta.servlet.http.HttpServletResponse;

public class ProcessResponse {

    public static HttpServletResponse  processResponse(HttpServletResponse response){
        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("YYYY-MM-DD:HH:MM:SS");
        String currentDateTime = dateFormat.format(new Date());
        String headerkey = "Content-Disposition";
        String headervalue = "attachment; filename=pdf_" +
                currentDateTime+ UUID.randomUUID().toString().substring(5) + ".pdf";
        response.setHeader(headerkey, headervalue);
        return response;
    }



}
