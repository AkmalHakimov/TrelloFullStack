package com.example.trelloback.services.taskService;

import com.example.trelloback.entity.Status;
import com.example.trelloback.entity.Task;
import com.example.trelloback.payload.request.ReqTask;
import com.example.trelloback.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    @Override
    public HttpEntity<?> saveTask(ReqTask reqTask) {
        Task task = taskRepository.save(Task.builder()
                .description(reqTask.getDesc())
                .title(reqTask.getTitle())
                .status(Status.OPEN)
                .build());
        return ResponseEntity.ok(task);
    }

    @Override
    public HttpEntity<?> getTasks() {
        List<Task> allTasks = taskRepository.findAll();
        return ResponseEntity.ok(allTasks);
    }

    @Override
    public HttpEntity<?> delTask(UUID id) {
        taskRepository.deleteById(id);
        return ResponseEntity.ok("Tasks Deleted");
    }

    @Override
    public HttpEntity<?> editTaskStatus(UUID id, ReqTask reqTask) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setStatus(reqTask.getStatus());
        Task save = taskRepository.save(task);
        return ResponseEntity.ok(save);
    }
}
