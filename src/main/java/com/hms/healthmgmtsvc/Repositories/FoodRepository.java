package com.hms.healthmgmtsvc.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FoodRepository extends CrudRepository<Food, Integer>, JpaRepository<Food, Integer> {

    List<Food> findByUserName(String userName);
}
