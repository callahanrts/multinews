package main

import (
	"log"
	"net/http"
	"text/template"
	"github.com/callahanrts/multinews/newsItems"
)

type News struct {
	JSONUrl string
	NewsType string
}

func viewHandler(w http.ResponseWriter, r *http.Request) {
	news := []News{{"http://api.ihackernews.com/page","hackerNews"},{"http://www.reddit.com/r/programming/.json","reddit"}}

  //  // Loop through news articles
	for _, source := range news {
		articles, err := newsItems.Get(source.JSONUrl, source.NewsType)
		if err != nil {
			log.Fatal(err)
		}
		
		// Loop through items and print to web page
		for _, item := range articles {
			t, _ := template.ParseFiles("templates/items/" + source.NewsType + ".html")
			t.Execute(w, item)
		} // for items
	} // for source types
} // function

// MAIN
func main() {
	// Create handler and listen on port 8080
	http.HandleFunc("/", viewHandler)
  http.ListenAndServe(":8080", nil)
}
