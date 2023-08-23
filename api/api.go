package api

import (
	"velozient/models"
	"github.com/gin-gonic/gin"
	"strconv"
	"time"
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
	now := time.Now()

	if err := c.BindJSON(&card); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	card.ID = now.UnixMilli() // I would use a UUID here, but this is just for testing

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
		if cards[i].ID == int64(id) {
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

	var newCards Cards
	for i := range cards {
		if cards[i].ID != int64(id) {
			newCards = append(newCards, cards[i])
		}
	}
	cards = newCards

	c.JSON(200, gin.H{
		"message": "Card Deleted OK",
		"data": cards,
	})
}

func GetCard(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var card models.Card
	for i := range cards {
		if cards[i].ID == int64(id) {
			card = cards[i]
		}
	}

	c.JSON(200, gin.H{
		"message": "Here is your card",
		"data": card,
	})
}