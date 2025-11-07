package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Vinyl struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string             `bson:"title" json:"title"`
	Artist      string             `bson:"artist" json:"artist"`
	Price       float64            `bson:"price" json:"price"`
	Stock       int                `bson:"stock" json:"stock"`
	Year        int                `bson:"year" json:"year"`
	Genres      []string           `bson:"genres" json:"genres"`
	CoverURL    string             `bson:"cover_url" json:"cover_url"`
	Description string             `bson:"description,omitempty" json:"description,omitempty"`
	CreatedAt   time.Time          `bson:"created_at" json:"created_at"`
	UpdatedAt   time.Time          `bson:"updated_at" json:"updated_at"`
}

