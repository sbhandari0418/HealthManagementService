package com.hms.healthmgmtsvc.Services;

import com.hms.healthmgmtsvc.DTO.FoodDTO;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IFoodService {

    List<FoodDTO> getFoodByUsername(String userName);
    List<FoodDTO> postFoodByUsername(String foodName, int calories, Date date, String userName);
}
