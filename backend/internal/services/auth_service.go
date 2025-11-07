package services

import (
	"context"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"vinyl-store/internal/auth"
	"vinyl-store/internal/dto"
	apperrors "vinyl-store/internal/errors"
	"vinyl-store/internal/models"
	"vinyl-store/internal/repository"
)

type AuthService struct {
	userRepo *repository.UserRepository
}

func NewAuthService(userRepo *repository.UserRepository) *AuthService {
	return &AuthService{userRepo: userRepo}
}

func (s *AuthService) Login(ctx context.Context, req dto.LoginRequest) (*dto.LoginResponse, error) {
	user, err := s.userRepo.FindByEmail(ctx, req.Email)
	if err != nil {
		return nil, apperrors.ErrInvalidCredentials
	}

	if !auth.CheckPasswordHash(req.Password, user.Password) {
		return nil, apperrors.ErrInvalidCredentials
	}

	token, err := auth.GenerateToken(user.ID.Hex(), user.Email, user.Role)
	if err != nil {
		return nil, err
	}

	return &dto.LoginResponse{
		User: dto.UserResponse{
			ID:    user.ID.Hex(),
			Email: user.Email,
			Name:  user.Name,
			Role:  user.Role,
		},
		Token: token,
	}, nil
}

func (s *AuthService) GetUserByID(ctx context.Context, userID string) (*models.User, error) {
	id, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, apperrors.ErrInvalidInput
	}

	user, err := s.userRepo.FindByID(ctx, id)
	if err != nil {
		return nil, apperrors.ErrNotFound
	}

	return user, nil
}

