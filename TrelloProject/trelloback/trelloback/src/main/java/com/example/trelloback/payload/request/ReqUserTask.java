package com.example.trelloback.payload.request;

import com.example.trelloback.entity.WorkType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqUserTask {

    private UUID id;
    private WorkType status;

}
