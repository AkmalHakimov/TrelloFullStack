package com.example.trelloback.services.userService;


import com.example.trelloback.payload.request.ReqUserTask;
import org.springframework.http.HttpEntity;

import java.util.List;
import java.util.UUID;

public interface UserService {
    HttpEntity<?> getUsers();

    HttpEntity<?> assignUser(List<ReqUserTask> userTaskList, UUID taskId);

    HttpEntity<?> getUserTasks();
}
