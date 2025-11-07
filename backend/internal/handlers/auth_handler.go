package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"vinyl-store/internal/dto"
	apperrors "vinyl-store/internal/errors"
	"vinyl-store/internal/services"
)

type AuthHandler struct {
	authService *services.AuthService
}

func NewAuthHandler(authService *services.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   apperrors.ErrValidation.Error(),
			"details": err.Error(),
		})
		return
	}

	response, err := h.authService.Login(c.Request.Context(), req)
	if err != nil {
		if err == apperrors.ErrInvalidCredentials {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	c.JSON(http.StatusOK, response)
}

