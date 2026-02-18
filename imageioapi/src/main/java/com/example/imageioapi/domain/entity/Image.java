package com.example.imageioapi.domain.entity;

import com.example.imageioapi.domain.enums.ImageExtension;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Table(name = "image")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long size;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ImageExtension extension;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant uploadDate;

    @LastModifiedDate
    @Column
    private Instant updatedAt;

    @Column
    private String tags;

    @Lob
    @Column(nullable = false)
    private byte[] file;

    public String getFileName(){
        return name.concat(".").concat(extension.name());
    }
}
