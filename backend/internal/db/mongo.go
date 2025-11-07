package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"vinyl-store/internal/config"
)

var Client *mongo.Client
var Database *mongo.Database

func Connect() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	clientOptions := options.Client().ApplyURI(config.AppConfig.MongoURI)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		return err
	}

	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		return err
	}

	Client = client
	Database = client.Database(config.AppConfig.MongoDB)

	log.Println("Connected to MongoDB")

	if err := createIndexes(); err != nil {
		return err
	}

	return nil
}

func createIndexes() error {
	ctx := context.Background()

	// Índice único en email de usuarios
	usersCollection := Database.Collection("users")
	emailIndexModel := mongo.IndexModel{
		Keys:    map[string]interface{}{"email": 1},
		Options: options.Index().SetUnique(true),
	}
	if _, err := usersCollection.Indexes().CreateOne(ctx, emailIndexModel); err != nil {
		log.Printf("Warning: Could not create email index: %v", err)
	}

	// Índices para búsqueda de vinilos
	vinylsCollection := Database.Collection("vinyls")
	indexes := []mongo.IndexModel{
		{
			Keys: map[string]interface{}{"title": "text", "artist": "text"},
		},
		{
			Keys: map[string]interface{}{"genres": 1},
		},
		{
			Keys: map[string]interface{}{"price": 1},
		},
	}
	if _, err := vinylsCollection.Indexes().CreateMany(ctx, indexes); err != nil {
		log.Printf("Warning: Could not create vinyl indexes: %v", err)
	}

	// Índice en user_id de órdenes
	ordersCollection := Database.Collection("orders")
	userIDIndexModel := mongo.IndexModel{
		Keys: map[string]interface{}{"user_id": 1},
	}
	if _, err := ordersCollection.Indexes().CreateOne(ctx, userIDIndexModel); err != nil {
		log.Printf("Warning: Could not create order user_id index: %v", err)
	}

	return nil
}

func Disconnect() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	return Client.Disconnect(ctx)
}

