package com.example.imageioapi.domain.service;

import com.example.imageioapi.application.images.UpdateImageDTO;
import com.example.imageioapi.domain.entity.Image;
import com.example.imageioapi.domain.enums.ImageExtension;

import java.util.List;
import java.util.Optional;

public interface ImageService {
   Image save (Image image);

   Optional<Image> getById(String id);

   List<Image> search(ImageExtension extension, String query);

   boolean deleteById(String id);

   boolean updateMetadata(String id, UpdateImageDTO dto);
}


