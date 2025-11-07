package errors

import "errors"

var (
	ErrNotFound          = errors.New("resource not found")
	ErrUnauthorized      = errors.New("unauthorized")
	ErrForbidden         = errors.New("forbidden")
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrValidation        = errors.New("validation error")
	ErrConflict          = errors.New("resource already exists")
	ErrInsufficientStock = errors.New("insufficient stock")
	ErrInvalidInput      = errors.New("invalid input")
)

type AppError struct {
	Code    string
	Message string
	Details map[string]interface{}
}

func (e *AppError) Error() string {
	return e.Message
}

func NewAppError(code, message string, details map[string]interface{}) *AppError {
	return &AppError{
		Code:    code,
		Message: message,
		Details: details,
	}
}

