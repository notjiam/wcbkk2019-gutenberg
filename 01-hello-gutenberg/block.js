(function(){
    var el = wp.element.createElement;

    wp.blocks.registerBlockType('hello-gutenberg/hello-gutenberg',{
        title: 'Hello Gutenberg',
        category: 'common',
        icon: 'image-filter',
        attributes:{
        },
        edit: function( props ){
            return el('h1', {}, "Hello Gutenberg editor")
        },
        save: function( props ){
            return el('h1', {}, "Hello Gutenberg Front-End")
        },
    });
})()