package services

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"vinyl-store/internal/dto"
	apperrors "vinyl-store/internal/errors"
	"vinyl-store/internal/models"
	"vinyl-store/internal/repository"
)

type VinylService struct {
	vinylRepo *repository.VinylRepository
}

func NewVinylService(vinylRepo *repository.VinylRepository) *VinylService {
	return &VinylService{vinylRepo: vinylRepo}
}

func (s *VinylService) GetAll(ctx context.Context, filters dto.VinylFilters) ([]*dto.VinylResponse, error) {
	filterMap := make(map[string]interface{})
	if filters.Query != "" {
		filterMap["query"] = filters.Query
	}
	if filters.Genre != "" {
		filterMap["genre"] = filters.Genre
	}
	if filters.MinPrice != nil {
		filterMap["minPrice"] = *filters.MinPrice
	}
	if filters.MaxPrice != nil {
		filterMap["maxPrice"] = *filters.MaxPrice
	}

	vinyls, err := s.vinylRepo.FindAll(ctx, filterMap)
	if err != nil {
		return nil, err
	}

	responses := make([]*dto.VinylResponse, len(vinyls))
	for i, v := range vinyls {
		responses[i] = &dto.VinylResponse{
			ID:          v.ID.Hex(),
			Title:       v.Title,
			Artist:      v.Artist,
			Price:       v.Price,
			Stock:       v.Stock,
			Year:        v.Year,
			Genres:      v.Genres,
			CoverURL:    v.CoverURL,
			Description: v.Description,
		}
	}

	return responses, nil
}

func (s *VinylService) GetByID(ctx context.Context, id string) (*dto.VinylResponse, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, apperrors.ErrInvalidInput
	}

	vinyl, err := s.vinylRepo.FindByID(ctx, objectID)
	if err != nil {
		return nil, apperrors.ErrNotFound
	}

	return &dto.VinylResponse{
		ID:          vinyl.ID.Hex(),
		Title:       vinyl.Title,
		Artist:      vinyl.Artist,
		Price:       vinyl.Price,
		Stock:       vinyl.Stock,
		Year:        vinyl.Year,
		Genres:      vinyl.Genres,
		CoverURL:    vinyl.CoverURL,
		Description: vinyl.Description,
	}, nil
}

func (s *VinylService) Create(ctx context.Context, req dto.CreateVinylRequest) (*dto.VinylResponse, error) {
	vinyl := &models.Vinyl{
		Title:       req.Title,
		Artist:      req.Artist,
		Price:       req.Price,
		Stock:       req.Stock,
		Year:        req.Year,
		Genres:      req.Genres,
		CoverURL:    req.CoverURL,
		Description: req.Description,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	if err := s.vinylRepo.Create(ctx, vinyl); err != nil {
		return nil, err
	}

	return &dto.VinylResponse{
		ID:          vinyl.ID.Hex(),
		Title:       vinyl.Title,
		Artist:      vinyl.Artist,
		Price:       vinyl.Price,
		Stock:       vinyl.Stock,
		Year:        vinyl.Year,
		Genres:      vinyl.Genres,
		CoverURL:    vinyl.CoverURL,
		Description: vinyl.Description,
	}, nil
}

func (s *VinylService) Update(ctx context.Context, id string, req dto.UpdateVinylRequest) (*dto.VinylResponse, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, apperrors.ErrInvalidInput
	}

	updates := bson.M{}
	if req.Title != "" {
		updates["title"] = req.Title
	}
	if req.Artist != "" {
		updates["artist"] = req.Artist
	}
	if req.Price != nil {
		updates["price"] = *req.Price
	}
	if req.Stock != nil {
		updates["stock"] = *req.Stock
	}
	if req.Year != nil {
		updates["year"] = *req.Year
	}
	if len(req.Genres) > 0 {
		updates["genres"] = req.Genres
	}
	if req.CoverURL != "" {
		updates["cover_url"] = req.CoverURL
	}
	if req.Description != "" {
		updates["description"] = req.Description
	}

	if err := s.vinylRepo.Update(ctx, objectID, updates); err != nil {
		return nil, err
	}

	return s.GetByID(ctx, id)
}

func (s *VinylService) Delete(ctx context.Context, id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return apperrors.ErrInvalidInput
	}

	return s.vinylRepo.Delete(ctx, objectID)
}

func (s *VinylService) GetVinylForOrder(ctx context.Context, id string) (*models.Vinyl, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, apperrors.ErrInvalidInput
	}

	vinyl, err := s.vinylRepo.FindByID(ctx, objectID)
	if err != nil {
		return nil, apperrors.ErrNotFound
	}

	return vinyl, nil
}

