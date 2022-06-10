
## Week 1 Assignment: Flixster

Submitted by: **Charles Xu**

Estimated time spent: **16** hours spent in total

Deployed Application: [Movie Explorer Deployed Site](https://charlesxu27.github.io/Movie_Explorer/)

### Application Features

#### CORE FEATURES

- [x] User can view a list of current movies from The Movie Database API as a grid view
  - The grid element should have an id of `movies-grid`
  - Each movie wrapper element should have a class of `movie-card`
- [x] For each movie displayed, user can see the following details:
  - Title - the element should have a class of `movie-title`
  - Image - the `img` element should have a class of `movie-poster`
  - Votes - the element should have a class of `movie-votes`
- [x] User can load more current movies by clicking a button at the bottom of the list
  - The button should have an id of `load-more-movies-btn`.
  - When clicked, the page should not refresh.
  - New movies should simply be added to the bottom
- [x] Allow users to search for movies and display them in a grid view
  - There should be a search input element with an id of `search-input`
  - Users should be able to type into the input
  - When a user hits 'Enter', it should send a search request to the movies API
  - The results from the search should be displayed on the page
  - There should be a close icon with an id of `close-search-btn` that exits the search, clears results, and shows the current movies displayed previously
- [x] Website accounts for basic HTML/CSS accessibility features
- [x] Website should be responsive

#### STRETCH FEATURES

- [x] Deploy website using GitHub Pages. 
- [x] Allow user to view more details about a movie within a popup.
- [x] Improve the user experience through CSS & animation.
- [x] Allow movie video trailers to be played using [embedded YouTube](https://support.google.com/youtube/answer/171780?hl=en)
- [ ] Implement anything else that you can get done to improve the app functionality!

### Walkthrough Video

<img src="https://imgur.com/a/yw0bKQA" width="600">

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes, the labs were very helpful in giving me an idea of how to start building this site. For instance, knowing how to use async await functions to fetch data via an API call was immensely helpful. I was able to repeat these patterns to extend features on the movie site, like displaying trailers and movie details. I found the pop-up feature to be hard because I needed to have a good understanding of the DOM and how to inject html elements into the right places.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time, I would add a header at the top of the home page so users can browse more movie categories. I would also want to add animations to the website to make the website browsing experience smoother. Finally, I would clean up the javascript functions, so the fetch functions can be reused more often.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

I thought I did a good job debugging when things went wrong. Console.log become my favorite tool because I was able to see when functions were called and what the DOM looked like at various points of time. I ran into a lot of trouble with my injected HTML code because the code was added at the bottom of the body tag, after the script tag which led to unecessary refreshes of the page.


### Open-source libraries used

- I referred to MDN for many javascript functions and css attributes.

### Shout out

Shoutout to Snigdha for helping me figure out that the placement of my script tag led to some hidden refreshing errors!
