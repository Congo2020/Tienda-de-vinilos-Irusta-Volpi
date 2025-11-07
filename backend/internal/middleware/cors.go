package middleware

import (
	"github.com/gin-gonic/gin"
	"vinyl-store/internal/config"
)

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		origin := config.AppConfig.AllowedOrigin
		c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

