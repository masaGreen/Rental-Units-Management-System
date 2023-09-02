package com.masagreen.RentalUnitsManagement.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.masagreen.RentalUnitsManagement.dtos.unit.UnitReqDto;
import com.masagreen.RentalUnitsManagement.jwt.JwtFilter;
import com.masagreen.RentalUnitsManagement.jwt.JwtService;
import com.masagreen.RentalUnitsManagement.models.AppUser;
import com.masagreen.RentalUnitsManagement.models.Unit;
import com.masagreen.RentalUnitsManagement.repositories.UnitRepository;
import com.masagreen.RentalUnitsManagement.services.UnitService;
import io.jsonwebtoken.impl.crypto.JwtSigner;
import jakarta.persistence.EntityManager;
import jakarta.servlet.ServletContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.web.servlet.function.RequestPredicates.contentType;


@SpringBootTest
@AutoConfigureMockMvc
class UnitControllerTest {

    private Unit unit;
    private UnitReqDto unitReqDto;
    private  long id;
    @MockBean
    private JwtService jwtService;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UnitService unitService;
    @MockBean
    private UnitRepository unitRepository;

    @BeforeEach
    void setUp(){
        id=54464;
        unit = Unit.builder().id(id).plotName("pe").unitNumber("dlo-s1").tag("available").status(true).rent(410).build();

    }


    @Test

    void rentUnit() throws Exception {

        Mockito.when(unitService.saveUnit(unit)).thenReturn(unit);

        mockMvc.perform(MockMvcRequestBuilders.post("/v1/units")
                             .contentType(MediaType.APPLICATION_JSON)
                             .content(new ObjectMapper().writeValueAsString(unit))
                    )
                .andExpect(status().isBadRequest());



    }

    @Test
    void getUnits() throws Exception {

        Mockito.when(unitService.findAllUnits()).thenReturn(List.of(unit));
        mockMvc.perform(MockMvcRequestBuilders.get("/v1/units")
                           .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1));
    }


}