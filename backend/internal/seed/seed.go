package seed

import (
	"context"
	"log"
	"time"

	"vinyl-store/internal/auth"
	"vinyl-store/internal/models"
	"vinyl-store/internal/repository"
)

func Seed() error {
	ctx := context.Background()

	userRepo := repository.NewUserRepository()
	vinylRepo := repository.NewVinylRepository()

	// Seed admin user (idempotente)
	adminEmail := "admin@vinyl.local"
	existingAdmin, _ := userRepo.FindByEmail(ctx, adminEmail)
	if existingAdmin == nil {
		hashedPassword, err := auth.HashPassword("Admin123!")
		if err != nil {
			return err
		}

		admin := &models.User{
			Email:     adminEmail,
			Password:  hashedPassword,
			Name:      "Admin User",
			Role:      "admin",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		if err := userRepo.Create(ctx, admin); err != nil {
			log.Printf("Warning: Could not create admin user: %v", err)
		} else {
			log.Println("Admin user created")
		}
	} else {
		log.Println("Admin user already exists")
	}

	// Seed vinilos (idempotente)
	vinyls := []*models.Vinyl{
		{
			Title:       "Abbey Road",
			Artist:      "The Beatles",
			Price:       29.99,
			Stock:       15,
			Year:        1969,
			Genres:      []string{"Rock", "Pop"},
			CoverURL:    "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
			Description: "The eleventh studio album by the English rock band the Beatles.",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			Title:       "The Dark Side of the Moon",
			Artist:      "Pink Floyd",
			Price:       34.99,
			Stock:       12,
			Year:        1973,
			Genres:      []string{"Progressive Rock", "Psychedelic"},
			CoverURL:    "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
			Description: "The eighth studio album by the English rock band Pink Floyd.",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			Title:       "Kind of Blue",
			Artist:      "Miles Davis",
			Price:       27.99,
			Stock:       8,
			Year:        1959,
			Genres:      []string{"Jazz"},
			CoverURL:    "https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavis-KindOfBlue.jpg",
			Description: "A studio album by American jazz musician Miles Davis.",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			Title:       "Rumours",
			Artist:      "Fleetwood Mac",
			Price:       31.99,
			Stock:       10,
			Year:        1977,
			Genres:      []string{"Rock", "Pop"},
			CoverURL:    "https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG",
			Description: "The eleventh studio album by British-American rock band Fleetwood Mac.",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			Title:       "Led Zeppelin IV",
			Artist:      "Led Zeppelin",
			Price:       32.99,
			Stock:       14,
			Year:        1971,
			Genres:      []string{"Rock", "Metal"},
			CoverURL:    "https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg",
			Description: "The fourth studio album by the English rock band Led Zeppelin.",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			Title:       "Thriller",
			Artist:      "Michael Jackson",
			Price:       28.99,
			Stock:       20,
			Year:        1982,
			Genres:      []string{"Pop", "R&B", "Funk"},
			CoverURL:    "https://upload.wikimedia.org/wikipedia/en/5/5f/Michael_Jackson_-_Thriller.png",
			Description: "The sixth studio album by American singer Michael Jackson.",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			Title:       "Nevermind",
			Artist:      "Nirvana",
			Price:       30.99,
			Stock:       11,
			Year:        1991,
			Genres:      []string{"Rock", "Grunge", "Alternative"},
			CoverURL:    "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
			Description: "The second studio album by the American rock band Nirvana.",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			Title:       "Back in Black",
			Artist:      "AC/DC",
			Price:       29.99,
			Stock:       13,
			Year:        1980,
			Genres:      []string{"Rock", "Metal"},
			CoverURL:    "https://upload.wikimedia.org/wikipedia/en/2/23/ACDC_Back_in_Black.png",
			Description: "The seventh studio album by Australian rock band AC/DC.",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			Title:       "Hotel California",
			Artist:      "Eagles",
			Price:       26.99,
			Stock:       9,
			Year:        1976,
			Genres:      []string{"Rock", "Country"},
			CoverURL:    "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg",
			Description: "The fifth studio album by the American rock band Eagles.",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
		{
			Title:       "The Wall",
			Artist:      "Pink Floyd",
			Price:       35.99,
			Stock:       7,
			Year:        1979,
			Genres:      []string{"Progressive Rock"},
			CoverURL:    "https://upload.wikimedia.org/wikipedia/en/0/0d/PinkFloydWallCoverOriginalNoText.jpg",
			Description: "The eleventh studio album by the English rock band Pink Floyd.",
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
		},
	}

	for _, vinyl := range vinyls {
		existing, _ := vinylRepo.FindByTitleAndArtist(ctx, vinyl.Title, vinyl.Artist)
		if existing == nil {
			if err := vinylRepo.Create(ctx, vinyl); err != nil {
				log.Printf("Warning: Could not create vinyl %s - %s: %v", vinyl.Title, vinyl.Artist, err)
			} else {
				log.Printf("Vinyl created: %s - %s", vinyl.Title, vinyl.Artist)
			}
		} else {
			log.Printf("Vinyl already exists: %s - %s", vinyl.Title, vinyl.Artist)
		}
	}

	log.Println("Seed completed")
	return nil
}
