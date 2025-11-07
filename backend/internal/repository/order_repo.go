package repository

import (
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"vinyl-store/internal/db"
	"vinyl-store/internal/models"
)

type OrderRepository struct {
	collection *mongo.Collection
}

func NewOrderRepository() *OrderRepository {
	return &OrderRepository{
		collection: db.Database.Collection("orders"),
	}
}

func (r *OrderRepository) Create(ctx context.Context, order *models.Order) error {
	order.ID = primitive.NewObjectID()
	_, err := r.collection.InsertOne(ctx, order)
	return err
}

func (r *OrderRepository) FindByUserID(ctx context.Context, userID primitive.ObjectID) ([]*models.Order, error) {
	opts := options.Find()
	opts.SetSort(bson.M{"created_at": -1})

	cursor, err := r.collection.Find(ctx, bson.M{"user_id": userID}, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var orders []*models.Order
	if err := cursor.All(ctx, &orders); err != nil {
		return nil, err
	}

	return orders, nil
}

func (r *OrderRepository) FindByID(ctx context.Context, id primitive.ObjectID) (*models.Order, error) {
	var order models.Order
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&order)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("order not found")
		}
		return nil, err
	}
	return &order, nil
}

