// Package reddit implements a basic client for the redit api
package newsItems

import (
	"log"
	"net/http"
	"fmt"
	"encoding/json"
	"errors"
)

// Data Structures

//Maybe parse this all out at some point	
type Item struct {
	//Shared
	Title string
	Url string

	//Hacker News
	CommentCount int
	Points int
	PostedAgo string
	PostedBy string

	// Reddit
	Comments int `json:"num_comments"`
	Subreddit string
	Score int
	Thumbnail string
	//Created string
	Author string
}

type Response struct {
	// Reddit
	Data struct {
		Children []struct {
			Data Item
		} // Children
	} // Data

	// Hacker News
	NextId int
	Items []Item
}

// Get fetches the most recent items posted to the specified jsonUrl
func Get(jsonUrl string, jsonType string) ([]Item, error) {
	// Make GET request to specified jsonURL
	resp, err := http.Get(fmt.Sprintf(jsonUrl))
	if err != nil {
		return nil, err
	}

	// Shut down tcp connection
	defer resp.Body.Close() 
	if resp.StatusCode != http.StatusOK {
		log.Print("error: %s", jsonType)
		return nil, errors.New(resp.Status)
	}

	// Create response to hold items
	r := new(Response)
	err = json.NewDecoder(resp.Body).Decode(r)
	if err != nil {
		log.Fatal(err)
	}

	switch jsonType {
  case "hackerNews":
    return hackerItems(r), nil
  case "reddit":
    return redditItems(r), nil
  }
  return nil, nil
}

func hackerItems(r *Response) ([]Item) {
	items := make([]Item, len(r.Items))
	for i, child := range r.Items { 
		items[i] = child
	}
	return items
}

func redditItems(r *Response) ([]Item) {
	items := make([]Item, len(r.Data.Children))
	for i, child := range r.Data.Children { 
		items[i] = child.Data
	}
	return items
}

// override the stringer interface to stringify an object
func (i Item) String() string {
	return fmt.Sprintf("%s (%d)\n%s\n%s %s\n\n\n", i.Title, i.Points, i.Url, i.PostedBy, i.PostedAgo)
}

