package main

import (
	"velozient/api"
	"github.com/gin-gonic/gin"
)

// Entry point and routes for velozient test
func main() {
	router := gin.Default()

	router.GET("/password-cards", api.AllCards)
	router.POST("/password-cards", api.NewCard)

	router.PUT("/password-cards/:id", api.EditCard)
	router.DELETE("/password-cards/:id", api.DeleteCard)


	router.Run(":8040")
}

