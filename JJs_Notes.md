## JJ's Notes and Suggestions
* Reduce the amount of globally exposed variables and methods
  * Encapsulate your app's state and any methods that get or set that state
    within its own scope (could use an Immediately Invoked Function Expression *IIFE*)
* Don't use `window.localStorage`
  * Offers no data protection and limits you to only storing string data, which could require you to do a lot of data conversion in between actions
