package com.example.trelloback.repository;

import com.example.trelloback.entity.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserTaskRepository extends JpaRepository<UserTask, UUID> {

}
