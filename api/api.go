package api

import (
	"velozient/models"
	"github.com/gin-gonic/gin"
	"strconv"
)

type Cards []models.Card
var cards Cards

func AllCards(c *gin.Context) {
	c.JSON(200, gin.H{
		"data": cards,
	})
}

func NewCard(c *gin.Context) {
	var card models.Card

	if err := c.BindJSON(&card); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	cards = append(cards, card)

	c.JSON(200, gin.H{
		"message": "Card Inserted OK",
	})
}

func EditCard(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var card models.Card

	if err := c.BindJSON(&card); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	for i := range cards {
		if cards[i].ID == id {
			cards[i] = card
		}
	}

	c.JSON(200, gin.H{
		"message": "Card Edited OK",
		"card": card,
	})
}

func DeleteCard(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var card models.Card

	if err := c.BindJSON(&card); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var newCards Cards
	for i := range cards {
		if cards[i].ID != id {
			newCards = append(newCards, cards[i])
		}
	}
	cards = newCards

	c.JSON(200, gin.H{
		"message": "Card Deleted OK",
		"cards": cards,
	})
}