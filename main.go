package main

import (
	"velozient/api"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Entry point and routes for velozient test
func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"*"}, // only for testing - definitely would add some security here
        AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "DELETE"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
    }))

	router.GET("/password-cards", api.AllCards)
	router.GET("/password-cards/:id", api.GetCard)
	router.POST("/password-cards", api.NewCard)
	router.PUT("/password-cards/:id", api.EditCard)
	router.DELETE("/password-cards/:id", api.DeleteCard)

	router.Run(":8040")
}

