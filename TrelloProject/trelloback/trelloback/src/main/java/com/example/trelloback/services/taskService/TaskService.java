package com.example.trelloback.services.taskService;


import com.example.trelloback.payload.request.ReqTask;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface TaskService {
    HttpEntity<?> saveTask(ReqTask reqTask);

    HttpEntity<?> getTasks();

    HttpEntity<?> delTask(UUID id);

    HttpEntity<?> editTaskStatus(UUID id, ReqTask reqTask);
}
