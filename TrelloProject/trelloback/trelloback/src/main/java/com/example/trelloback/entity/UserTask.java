package com.example.trelloback.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "user_tasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTask {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    private User user;

    @OneToOne
    private Task task;

    private WorkType workType;


}
