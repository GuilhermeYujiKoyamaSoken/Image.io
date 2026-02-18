package com.example.imageioapi.application.images;

import com.example.imageioapi.domain.entity.Image;
import com.example.imageioapi.domain.enums.ImageExtension;
import com.example.imageioapi.domain.service.ImageService;
import com.example.imageioapi.infra.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository repository;

    @Override
    @Transactional
    public Image save(Image image) {
        return repository.save(image);
    }

    @Override
    @Transactional
    public boolean deleteById(String id) {
        return repository.findById(id)
                .map(image -> {
                    repository.delete(image);
                    return true;
                })
                .orElse(false);
    }

    @Override
    @Transactional
    public boolean updateMetadata(String id, UpdateImageDTO dto) {

        return repository.findById(id)
                .map(image -> {

                    if (dto.getName() != null) {

                        String newName = dto.getName().trim();

                        if (newName.isBlank()) {
                            throw new IllegalArgumentException("Nome não pode ser vazio");
                        }

                        image.setName(newName);
                    }
                    if (dto.getTags() != null) {

                        String newTags = dto.getTags().trim();

                        if (newTags.isBlank()) {
                            throw new IllegalArgumentException("Tags não podem ser vazias");
                        }

                        image.setTags(newTags);
                    }

                    return true;
                })
                .orElse(false);
    }

    @Override
    public Optional<Image> getById(String id) {
        return repository.findById(id);
    }

    @Override
    public List<Image> search(ImageExtension extension, String query) {
        return repository.findByExtensionAndNameOrTagsLike(extension, query);
    }
}
