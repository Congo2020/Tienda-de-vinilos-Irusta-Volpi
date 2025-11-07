package dto

type VinylResponse struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Artist      string   `json:"artist"`
	Price       float64  `json:"price"`
	Stock       int      `json:"stock"`
	Year        int      `json:"year"`
	Genres      []string `json:"genres"`
	CoverURL    string   `json:"cover_url"`
	Description string   `json:"description,omitempty"`
}

type CreateVinylRequest struct {
	Title       string   `json:"title" binding:"required,min=1"`
	Artist      string   `json:"artist" binding:"required,min=1"`
	Price       float64  `json:"price" binding:"required,gt=0"`
	Stock       int      `json:"stock" binding:"gte=0"`
	Year        int      `json:"year" binding:"required,gte=1900"`
	Genres      []string `json:"genres" binding:"required,min=1"`
	CoverURL    string   `json:"cover_url" binding:"required,url"`
	Description string   `json:"description"`
}

type UpdateVinylRequest struct {
	Title       string   `json:"title" binding:"omitempty,min=1"`
	Artist      string   `json:"artist" binding:"omitempty,min=1"`
	Price       *float64 `json:"price" binding:"omitempty,gt=0"`
	Stock       *int     `json:"stock" binding:"omitempty,gte=0"`
	Year        *int     `json:"year" binding:"omitempty,gte=1900"`
	Genres      []string `json:"genres" binding:"omitempty,min=1"`
	CoverURL    string   `json:"cover_url" binding:"omitempty,url"`
	Description string   `json:"description"`
}

type VinylFilters struct {
	Query    string
	Genre    string
	MinPrice *float64
	MaxPrice *float64
}

