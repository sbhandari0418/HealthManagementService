package com.hms.healthmgmtsvc.Controllers;

import com.hms.healthmgmtsvc.DTO.FoodDTO;
import com.hms.healthmgmtsvc.Services.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://zealous-mushroom-0c05d8a0f.5.azurestaticapps.net"})
@RequestMapping("/api/hms/food")
public class FoodController {

    private FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService){
        this.foodService = foodService;
    }

    @PostMapping("/tracker/{foodName}/{calories}/{date}")
    public List<FoodDTO> saveFood(
            @PathVariable String foodName,
            @PathVariable int calories,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd")  Date date){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return this.foodService.postFoodByUsername(foodName, calories, date, authentication.getName());
    }

    @GetMapping
    public List<FoodDTO> getFood(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return this.foodService.getFoodByUsername(authentication.getName());
    }
}
