package models

type Card struct {
	ID int `json:"id"` 
	Name string `json:"name"`
	URL string `json:"url"`
	Username string `json:"username"`
	Password string `json:"password"`
}