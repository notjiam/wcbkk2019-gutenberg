(function(){
    var el = wp.element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;
    var RichText = wp.editor.RichText;
    var MediaUpload = wp.editor.MediaUpload;
    var components = wp.components;

    registerBlockType('karaoke/karaoke-block', {
        title: 'Karaoke Block',
        category: 'common',
        icon: 'microphone',
        attributes:{
            thLyrics: {
				type: 'array',
				source: 'children',
				selector: '.th-lyrics',
            },
            enLyrics: {
				type: 'array',
				source: 'children',
				selector: '.en-lyrics',
			},
            mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			},
        },
        edit: function( props ){
            var attributes = props.attributes
            return el(
                'div', { className: props.className },
                el( RichText, {
					tagName: 'div',
					inline: true,
					placeholder: 'Thai lyrics',
					value: attributes.thLyrics,
					onChange: function( value ) {
						props.setAttributes( { thLyrics: value } );
					},
                } ),
                el( RichText, {
					tagName: 'div',
					inline: true,
					placeholder: 'English lyrics',
					value: attributes.enLyrics,
					onChange: function( value ) {
						props.setAttributes( { enLyrics: value } );
					},
                } ),
				el( MediaUpload, {
                    allowedTypes: 'image',
                    value: attributes.mediaID,
					onSelect: function( media ){
                        return props.setAttributes( {
                            mediaURL: media.url,
                            mediaID: media.id,
                        } );
                    },
					render: function( obj ) {
						return el( components.Button, {
								className: attributes.mediaID ? 'image-button' : 'button button-large',
								onClick: obj.open
							},
							! attributes.mediaID ? 'Upload Image' : el( 'img', { src: attributes.mediaURL } )
						);
					}
                } )
            )
        },
        save: function( props ){
            var attributes = props.attributes
            return el('div', {
                className: props.className
            },
                el('div', {
                    className: 'lyrics-active'
                },
                    el(RichText.Content, {
                        className: 'th-lyrics-active',
                        tagName: 'div',
                        value: attributes.thLyrics
                    }),
                    el(RichText.Content, {
                        className: 'en-lyrics-active',
                        tagName: 'div',
                        value: attributes.enLyrics
                    })
                ),
                el('div', {
                    className: 'lyrics-wrapper'
                },
                    el(RichText.Content, {
                        className: 'th-lyrics',
                        tagName: 'div',
                        value: attributes.thLyrics
                    }),
                    el(RichText.Content, {
                        className: 'en-lyrics',
                        tagName: 'div',
                        value: attributes.enLyrics
                    })
                ),
                attributes.mediaURL && el('img',{ src: attributes.mediaURL })
            );
        }
    })
})()