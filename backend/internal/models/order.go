package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type OrderItem struct {
	VinylID  primitive.ObjectID `bson:"vinyl_id" json:"vinyl_id"`
	Quantity int                 `bson:"quantity" json:"quantity"`
	Price    float64             `bson:"price" json:"price"` // Precio al momento de la compra
}

type Order struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID     primitive.ObjectID `bson:"user_id" json:"user_id"`
	Items      []OrderItem        `bson:"items" json:"items"`
	Total      float64            `bson:"total" json:"total"`
	Status     string             `bson:"status" json:"status"`
	FullName   string             `bson:"full_name" json:"full_name"`
	Address    string             `bson:"address" json:"address"`
	City       string             `bson:"city" json:"city"`
	PostalCode string             `bson:"postal_code" json:"postal_code"`
	Phone      string             `bson:"phone" json:"phone"`
	CreatedAt  time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt  time.Time          `bson:"updated_at" json:"updated_at"`
}

