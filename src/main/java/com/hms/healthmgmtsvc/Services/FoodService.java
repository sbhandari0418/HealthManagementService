package com.hms.healthmgmtsvc.Services;

import com.hms.healthmgmtsvc.DTO.FoodDTO;
import com.hms.healthmgmtsvc.Repositories.Food;
import com.hms.healthmgmtsvc.Repositories.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FoodService implements IFoodService{

    private FoodRepository foodRepository;

    @Autowired
    public  FoodService(FoodRepository foodRepository){
        this.foodRepository = foodRepository;
    }

    @Override
    public List<FoodDTO> getFoodByUsername(String userName) {
        List<Food> foods = this.foodRepository.findByUserName(userName);

        // Create a map to aggregate total calories by date
        Map<Date, Integer> caloriesByDate = foods.stream()
                .collect(Collectors.groupingBy(Food::getIntakeDate,
                        Collectors.summingInt(Food::getCalories)));

        return caloriesByDate.entrySet().stream()
                .map(entry -> new FoodDTO(entry.getKey(), entry.getValue()))
                .sorted(Comparator.comparing(FoodDTO::getDate))
                .collect(Collectors.toList());

    }

    @Override
    public List<FoodDTO> postFoodByUsername(String foodName, int calories, Date date, String userName) {
        Food food = new Food(0, userName, foodName, calories, date);
        this.foodRepository.save(food);
        return null;
    }
}
