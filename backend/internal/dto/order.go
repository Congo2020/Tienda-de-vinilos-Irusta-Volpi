package dto

type OrderItemRequest struct {
	VinylID  string `json:"vinyl_id" binding:"required"`
	Quantity int    `json:"quantity" binding:"required,gt=0"`
}

type CreateOrderRequest struct {
	Items      []OrderItemRequest `json:"items" binding:"required,min=1,dive"`
	FullName   string             `json:"full_name" binding:"required,min=3"`
	Address    string             `json:"address" binding:"required,min=5"`
	City       string             `json:"city" binding:"required,min=2"`
	PostalCode string             `json:"postal_code" binding:"required,min=4,max=5"`
	Phone      string             `json:"phone" binding:"required,min=10"`
}

type OrderItemResponse struct {
	VinylID  string  `json:"vinyl_id"`
	Quantity int     `json:"quantity"`
	Price    float64 `json:"price"`
}

type OrderResponse struct {
	ID         string            `json:"id"`
	UserID     string            `json:"user_id"`
	Items      []OrderItemResponse `json:"items"`
	Total      float64           `json:"total"`
	Status     string            `json:"status"`
	FullName   string            `json:"full_name"`
	Address    string            `json:"address"`
	City       string            `json:"city"`
	PostalCode string            `json:"postal_code"`
	Phone      string            `json:"phone"`
	CreatedAt  string            `json:"created_at"`
}

