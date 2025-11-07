package repository

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"vinyl-store/internal/db"
	"vinyl-store/internal/models"
)

type VinylRepository struct {
	collection *mongo.Collection
}

func NewVinylRepository() *VinylRepository {
	return &VinylRepository{
		collection: db.Database.Collection("vinyls"),
	}
}

func (r *VinylRepository) Create(ctx context.Context, vinyl *models.Vinyl) error {
	vinyl.ID = primitive.NewObjectID()
	_, err := r.collection.InsertOne(ctx, vinyl)
	return err
}

func (r *VinylRepository) FindByID(ctx context.Context, id primitive.ObjectID) (*models.Vinyl, error) {
	var vinyl models.Vinyl
	err := r.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&vinyl)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("vinyl not found")
		}
		return nil, err
	}
	return &vinyl, nil
}

func (r *VinylRepository) FindAll(ctx context.Context, filters map[string]interface{}) ([]*models.Vinyl, error) {
	filter := bson.M{}

	if query, ok := filters["query"].(string); ok && query != "" {
		filter["$text"] = bson.M{"$search": query}
	}

	if genre, ok := filters["genre"].(string); ok && genre != "" {
		filter["genres"] = genre
	}

	if minPrice, ok := filters["minPrice"].(float64); ok {
		if filter["price"] == nil {
			filter["price"] = bson.M{}
		}
		filter["price"].(bson.M)["$gte"] = minPrice
	}

	if maxPrice, ok := filters["maxPrice"].(float64); ok {
		if filter["price"] == nil {
			filter["price"] = bson.M{}
		}
		if priceFilter, ok := filter["price"].(bson.M); ok {
			priceFilter["$lte"] = maxPrice
		} else {
			filter["price"] = bson.M{"$lte": maxPrice}
		}
	}

	opts := options.Find()
	opts.SetSort(bson.M{"created_at": -1})

	cursor, err := r.collection.Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var vinyls []*models.Vinyl
	if err := cursor.All(ctx, &vinyls); err != nil {
		return nil, err
	}

	return vinyls, nil
}

func (r *VinylRepository) Update(ctx context.Context, id primitive.ObjectID, updates bson.M) error {
	// Si updates ya contiene operadores como $inc, $set, usarlo directamente
	// Si no, envolver en $set
	if _, hasSet := updates["$set"]; !hasSet {
		if _, hasInc := updates["$inc"]; !hasInc {
			updates["updated_at"] = time.Now()
			result, err := r.collection.UpdateOne(
				ctx,
				bson.M{"_id": id},
				bson.M{"$set": updates},
			)
			if err != nil {
				return err
			}
			if result.MatchedCount == 0 {
				return errors.New("vinyl not found")
			}
			return nil
		}
	}
	
	// Si tiene operadores, agregar updated_at con $set
	updateDoc := bson.M{}
	for k, v := range updates {
		updateDoc[k] = v
	}
	updateDoc["$set"] = bson.M{"updated_at": time.Now()}
	
	result, err := r.collection.UpdateOne(
		ctx,
		bson.M{"_id": id},
		updateDoc,
	)
	if err != nil {
		return err
	}
	if result.MatchedCount == 0 {
		return errors.New("vinyl not found")
	}
	return nil
}

func (r *VinylRepository) Delete(ctx context.Context, id primitive.ObjectID) error {
	result, err := r.collection.DeleteOne(ctx, bson.M{"_id": id})
	if err != nil {
		return err
	}
	if result.DeletedCount == 0 {
		return errors.New("vinyl not found")
	}
	return nil
}

func (r *VinylRepository) FindByTitleAndArtist(ctx context.Context, title, artist string) (*models.Vinyl, error) {
	var vinyl models.Vinyl
	err := r.collection.FindOne(ctx, bson.M{"title": title, "artist": artist}).Decode(&vinyl)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &vinyl, nil
}

