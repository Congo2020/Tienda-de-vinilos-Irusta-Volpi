package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"vinyl-store/internal/dto"
	apperrors "vinyl-store/internal/errors"
	"vinyl-store/internal/services"
)

type VinylHandler struct {
	vinylService *services.VinylService
}

func NewVinylHandler(vinylService *services.VinylService) *VinylHandler {
	return &VinylHandler{vinylService: vinylService}
}

func (h *VinylHandler) GetAll(c *gin.Context) {
	filters := dto.VinylFilters{
		Query: c.Query("q"),
		Genre: c.Query("genre"),
	}

	if minPriceStr := c.Query("minPrice"); minPriceStr != "" {
		if minPrice, err := strconv.ParseFloat(minPriceStr, 64); err == nil {
			filters.MinPrice = &minPrice
		}
	}

	if maxPriceStr := c.Query("maxPrice"); maxPriceStr != "" {
		if maxPrice, err := strconv.ParseFloat(maxPriceStr, 64); err == nil {
			filters.MaxPrice = &maxPrice
		}
	}

	vinyls, err := h.vinylService.GetAll(c.Request.Context(), filters)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	c.JSON(http.StatusOK, vinyls)
}

func (h *VinylHandler) GetByID(c *gin.Context) {
	id := c.Param("id")
	vinyl, err := h.vinylService.GetByID(c.Request.Context(), id)
	if err != nil {
		if err == apperrors.ErrNotFound || err == apperrors.ErrInvalidInput {
			c.JSON(http.StatusNotFound, gin.H{"error": apperrors.ErrNotFound.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	c.JSON(http.StatusOK, vinyl)
}

func (h *VinylHandler) Create(c *gin.Context) {
	var req dto.CreateVinylRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   apperrors.ErrValidation.Error(),
			"details": err.Error(),
		})
		return
	}

	vinyl, err := h.vinylService.Create(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	c.JSON(http.StatusCreated, vinyl)
}

func (h *VinylHandler) Update(c *gin.Context) {
	id := c.Param("id")
	var req dto.UpdateVinylRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error":   apperrors.ErrValidation.Error(),
			"details": err.Error(),
		})
		return
	}

	vinyl, err := h.vinylService.Update(c.Request.Context(), id, req)
	if err != nil {
		if err == apperrors.ErrNotFound || err == apperrors.ErrInvalidInput {
			c.JSON(http.StatusNotFound, gin.H{"error": apperrors.ErrNotFound.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	c.JSON(http.StatusOK, vinyl)
}

func (h *VinylHandler) Delete(c *gin.Context) {
	id := c.Param("id")
	err := h.vinylService.Delete(c.Request.Context(), id)
	if err != nil {
		if err == apperrors.ErrNotFound || err == apperrors.ErrInvalidInput {
			c.JSON(http.StatusNotFound, gin.H{"error": apperrors.ErrNotFound.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "vinyl deleted successfully"})
}

