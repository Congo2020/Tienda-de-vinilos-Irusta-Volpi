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

type OrderService struct {
	orderRepo *repository.OrderRepository
	vinylRepo *repository.VinylRepository
}

func NewOrderService(orderRepo *repository.OrderRepository, vinylRepo *repository.VinylRepository) *OrderService {
	return &OrderService{
		orderRepo: orderRepo,
		vinylRepo: vinylRepo,
	}
}

func (s *OrderService) Create(ctx context.Context, userID string, req dto.CreateOrderRequest) (*dto.OrderResponse, error) {
	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, apperrors.ErrInvalidInput
	}

	var orderItems []models.OrderItem
	var total float64

	// Validar y calcular total en backend
	for _, itemReq := range req.Items {
		vinylObjectID, err := primitive.ObjectIDFromHex(itemReq.VinylID)
		if err != nil {
			return nil, apperrors.ErrInvalidInput
		}

		vinyl, err := s.vinylRepo.FindByID(ctx, vinylObjectID)
		if err != nil {
			return nil, apperrors.ErrNotFound
		}

		if vinyl.Stock < itemReq.Quantity {
			return nil, apperrors.ErrInsufficientStock
		}

		subtotal := vinyl.Price * float64(itemReq.Quantity)
		total += subtotal

		orderItems = append(orderItems, models.OrderItem{
			VinylID:  vinylObjectID,
			Quantity: itemReq.Quantity,
			Price:    vinyl.Price,
		})
	}

	// Crear orden
	order := &models.Order{
		UserID:     userObjectID,
		Items:      orderItems,
		Total:      total,
		Status:     "pending",
		FullName:   req.FullName,
		Address:    req.Address,
		City:       req.City,
		PostalCode: req.PostalCode,
		Phone:      req.Phone,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}

	if err := s.orderRepo.Create(ctx, order); err != nil {
		return nil, err
	}

	// Actualizar stock
	for _, item := range orderItems {
		updates := bson.M{
			"$inc": bson.M{"stock": -item.Quantity},
		}
		s.vinylRepo.Update(ctx, item.VinylID, updates)
	}

	// Convertir a response
	itemResponses := make([]dto.OrderItemResponse, len(orderItems))
	for i, item := range orderItems {
		itemResponses[i] = dto.OrderItemResponse{
			VinylID:  item.VinylID.Hex(),
			Quantity: item.Quantity,
			Price:    item.Price,
		}
	}

	return &dto.OrderResponse{
		ID:         order.ID.Hex(),
		UserID:     order.UserID.Hex(),
		Items:      itemResponses,
		Total:      order.Total,
		Status:     order.Status,
		FullName:   order.FullName,
		Address:    order.Address,
		City:       order.City,
		PostalCode: order.PostalCode,
		Phone:      order.Phone,
		CreatedAt:  order.CreatedAt.Format(time.RFC3339),
	}, nil
}

func (s *OrderService) GetUserOrders(ctx context.Context, userID string) ([]*dto.OrderResponse, error) {
	userObjectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, apperrors.ErrInvalidInput
	}

	orders, err := s.orderRepo.FindByUserID(ctx, userObjectID)
	if err != nil {
		return nil, err
	}

	responses := make([]*dto.OrderResponse, len(orders))
	for i, order := range orders {
		itemResponses := make([]dto.OrderItemResponse, len(order.Items))
		for j, item := range order.Items {
			itemResponses[j] = dto.OrderItemResponse{
				VinylID:  item.VinylID.Hex(),
				Quantity: item.Quantity,
				Price:    item.Price,
			}
		}

		responses[i] = &dto.OrderResponse{
			ID:         order.ID.Hex(),
			UserID:     order.UserID.Hex(),
			Items:      itemResponses,
			Total:      order.Total,
			Status:     order.Status,
			FullName:   order.FullName,
			Address:    order.Address,
			City:       order.City,
			PostalCode: order.PostalCode,
			Phone:      order.Phone,
			CreatedAt:  order.CreatedAt.Format(time.RFC3339),
		}
	}

	return responses, nil
}

