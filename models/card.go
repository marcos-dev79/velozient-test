package models

type Card struct {
	ID int64 `json:"id"` 
	Name string `json:"name"`
	URL string `json:"url"`
	Username string `json:"username"`
	Password string `json:"password"`
}