package server

import (
	"github.com/gin-gonic/gin"
	"vinyl-store/internal/handlers"
	"vinyl-store/internal/middleware"
	"vinyl-store/internal/repository"
	"vinyl-store/internal/services"
)

func SetupRouter() *gin.Engine {
	if gin.Mode() == "" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	// CORS middleware
	r.Use(middleware.CORS())

	// Repositories
	userRepo := repository.NewUserRepository()
	vinylRepo := repository.NewVinylRepository()
	orderRepo := repository.NewOrderRepository()

	// Services
	authService := services.NewAuthService(userRepo)
	vinylService := services.NewVinylService(vinylRepo)
	orderService := services.NewOrderService(orderRepo, vinylRepo)

	// Handlers
	authHandler := handlers.NewAuthHandler(authService)
	vinylHandler := handlers.NewVinylHandler(vinylService)
	orderHandler := handlers.NewOrderHandler(orderService)

	// API v1
	v1 := r.Group("/api/v1")
	{
		// Public routes
		v1.POST("/auth/login", authHandler.Login)
		v1.GET("/vinyls", vinylHandler.GetAll)
		v1.GET("/vinyls/:id", vinylHandler.GetByID)

		// Protected routes
		protected := v1.Group("")
		protected.Use(middleware.AuthRequired())
		{
			protected.POST("/orders", orderHandler.Create)
			protected.GET("/orders", orderHandler.GetUserOrders)
		}

		// Admin routes
		admin := v1.Group("")
		admin.Use(middleware.AuthRequired())
		admin.Use(middleware.AdminOnly())
		{
			admin.POST("/vinyls", vinylHandler.Create)
			admin.PUT("/vinyls/:id", vinylHandler.Update)
			admin.DELETE("/vinyls/:id", vinylHandler.Delete)
		}
	}

	return r
}

