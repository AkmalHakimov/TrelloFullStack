package com.example.trelloback.payload.request;

import com.example.trelloback.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqTask {
    private String title;
    private String desc;
    private Status status;
}
