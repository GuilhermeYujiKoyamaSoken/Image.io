package com.example.imageioapi.application.images;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;

@Builder
@Data
public class ImageDTO {

    private String id;
    private String name;
    private String url;
    private String extension;
    private String tags;
    private Long size;

    private Instant uploadDate;
    private Instant updatedAt;
}
