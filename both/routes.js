Router.route('/',{
    action: function(){
        this.render('blogPage')
    }
})
Router.route('/data',{
    action: function(){
        this.render('captureTemplate')
    }
})