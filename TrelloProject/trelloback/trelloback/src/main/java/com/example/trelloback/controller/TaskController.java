package com.example.trelloback.controller;

import com.example.trelloback.payload.request.ReqTask;
import com.example.trelloback.repository.TaskRepository;
import com.example.trelloback.services.taskService.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/task")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public HttpEntity<?> getTasks(){
        return taskService.getTasks();
    }

    @PostMapping
    public HttpEntity<?> saveTask(@RequestBody ReqTask reqTask){
        return taskService.saveTask(reqTask);
    }

    @DeleteMapping(path = "/{id}")
    public HttpEntity<?> delTask(@PathVariable UUID id){
        return taskService.delTask(id);
    }

    @PutMapping(path = "/{id}")
    public HttpEntity<?> editTaskStatus(@PathVariable UUID id, @RequestBody ReqTask reqTask){
        return taskService.editTaskStatus(id,reqTask);
    }
}
