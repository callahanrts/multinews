package main

import (
	"log"
	"net/http"
	"text/template"
	"fmt"

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

 func indexHandler(w http.ResponseWriter, r *http.Request) {
 	t, _ := template.ParseFiles("templates/index.html")
 	t.Execute(w, nil)
}

func main() {
  http.HandleFunc("/", indexHandler)
  http.Handle("/assets/", http.StripPrefix("/assets/", http.FileServer(http.Dir("assets"))))
  fmt.Println("listening...")
  err := http.ListenAndServe(":8080", nil)
  if err != nil {
    panic(err)
  }
}

