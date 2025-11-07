package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	MongoURI       string
	MongoDB        string
	JWTSecret      string
	JWTExpiration  string
	AllowedOrigin  string
	Port           string
	Env            string
}

var AppConfig *Config

func Load() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	AppConfig = &Config{
		MongoURI:      getEnv("MONGO_URI", "mongodb://localhost:27017"),
		MongoDB:       getEnv("MONGO_DB", "vinyl_store"),
		JWTSecret:     getEnv("JWT_SECRET", "supersecret_change_in_production"),
		JWTExpiration: getEnv("JWT_EXPIRATION", "2h"),
		AllowedOrigin: getEnv("ALLOWED_ORIGIN", "http://localhost:5173"),
		Port:          getEnv("PORT", "8080"),
		Env:           getEnv("ENV", "development"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

