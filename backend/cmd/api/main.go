package main

import (
	"log"
	"vinyl-store/internal/config"
	"vinyl-store/internal/db"
	"vinyl-store/internal/seed"
	"vinyl-store/internal/server"
)

func main() {
	// Load configuration
	config.Load()

	// Connect to MongoDB
	if err := db.Connect(); err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}
	defer db.Disconnect()

	// Run seed
	if err := seed.Seed(); err != nil {
		log.Printf("Warning: Seed failed: %v", err)
	}

	// Setup router
	r := server.SetupRouter()

	// Start server
	port := ":" + config.AppConfig.Port
	log.Printf("Server starting on port %s", port)
	if err := r.Run(port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

