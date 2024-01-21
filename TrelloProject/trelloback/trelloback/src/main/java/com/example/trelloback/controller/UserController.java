package com.example.trelloback.controller;

import com.example.trelloback.payload.request.ReqUserTask;
import com.example.trelloback.services.userService.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping
    public HttpEntity<?> getUsers(){
        return userService.getUsers();
    }

    @PostMapping("/{taskId}")
    public HttpEntity<?> assignUsers(@RequestBody List<ReqUserTask> userTaskList,@PathVariable UUID taskId){
        return userService.assignUser(userTaskList,taskId);
    }

    @GetMapping(path = "/task")
    public HttpEntity<?> getUserTasks(){
        return userService.getUserTasks();
    }

}
