const hbs = require('hbs');

hbs.registerHelper("blogUpdate", function(){
  return `/blog/update/${this.id}?httpmethod=PATCH`
})

hbs.registerHelper("blogDelete", function(){
  return `/blog/delete/${this.id}?httpmethod=DELETE`
})