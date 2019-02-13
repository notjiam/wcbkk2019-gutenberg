(function(){
    var el = wp.element.createElement;
    var RichText = wp.editor.RichText;

    wp.blocks.registerBlockType('editable-block/editable-block',{
        title: 'Editable Block',
        category: 'common',
        icon: 'image-filter',
        attributes:{
            content: {
                type: 'string',
                source: 'html',
                selector: '.banner'
            }
        },
        edit: function( props ){
            var attributes = props.attributes;
            return el('div',{
                className: props.className
            },
                el( RichText, {
                    tagName: 'div',
                    inline: true,
                    placeholder: 'Edit me..',
                    value: attributes.content,
                    onChange: function( value ){
                        props.setAttributes({
                            content: value
                        })
                    }
                }),
                el('hr',{}),
                el(RichText.Content, {
                    tagName: 'div',
                    className: 'banner',
                    value: attributes.content
                })
            )
        },
        save: function( props ){
            var attributes = props.attributes;
            return el('div', {
                    className: props.className
                },
                    el(RichText.Content, {
                        tagName: 'div',
                        className: 'banner',
                        value: attributes.content
                    })
                )
        },
    });
})()