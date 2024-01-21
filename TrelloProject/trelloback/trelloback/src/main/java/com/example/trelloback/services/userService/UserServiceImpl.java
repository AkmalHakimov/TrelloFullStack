package com.example.trelloback.services.userService;

import com.example.trelloback.entity.User;
import com.example.trelloback.entity.UserTask;
import com.example.trelloback.payload.request.ReqUserTask;
import com.example.trelloback.repository.TaskRepository;
import com.example.trelloback.repository.UserRepository;
import com.example.trelloback.repository.UserTaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserTaskRepository userTaskRepository;
    private final TaskRepository taskRepository;


    @Override
    public HttpEntity<?> getUsers() {
        List<User> AllUsers = userRepository.findAll();
        return ResponseEntity.ok(AllUsers);
    }

    @Override
    public HttpEntity<?> assignUser(List<ReqUserTask> userTaskList, UUID taskId) {
        for (ReqUserTask reqUserTask : userTaskList) {
            System.out.println(reqUserTask.getStatus());
            UserTask createdUserTask = UserTask.builder()
                    .user(userRepository.findById(reqUserTask.getId()).orElseThrow())
                    .id(UUID.randomUUID())
                    .workType(reqUserTask.getStatus())
                    .task(taskRepository.findById(taskId).orElseThrow())
                    .build();
            userTaskRepository.save(createdUserTask);
        }
        return ResponseEntity.ok("saved");
    }

    @Override
    public HttpEntity<?> getUserTasks() {
        return ResponseEntity.ok(userTaskRepository.findAll());
    }
}
