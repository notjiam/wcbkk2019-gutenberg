/**
 * BLOCK: karaoke-create-guten-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, MediaUpload } = wp.editor;
const { Button } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-karaoke-create-guten-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'karaoke-create-guten-block - CGB Block' ), // Block title.
	icon: 'microphone', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'karaoke-create-guten-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
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
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		const { attributes } = props
		return (
			<div className={ props.className }>
				<RichText
					tagName="div"
					inline={ true }
					placeholder="Thai lyrics"
					value={ attributes.thLyrics }
					onChange={ value => {
						props.setAttributes( { thLyrics: value } );
					} }
				/>
				<RichText
					tagName="div"
					inline={ true }
					placeholder="English lyrics"
					value={ attributes.enLyrics }
					onChange={ value => {
						props.setAttributes( { enLyrics: value } );
					} }
				/>
				<MediaUpload
					allowedTypes="image"
					value={ attributes.mediaID }
					onSelect={ media => {
						return props.setAttributes( {
							mediaURL: media.url,
							mediaID: media.id,
						} );
					} }
					render={ obj => {
						return ( <Button
							className={ attributes.mediaID ? 'image-button' : 'button button-large' }
							onClick={ obj.open }
						>{ ! attributes.mediaID ? 'Upload Image' : <img src={ attributes.mediaURL }/> }</Button>
						);
					} }
				/>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		const { attributes } = props;
		return (
			<div className={ props.attributes }>
				<div className="lyrics-active">
					<RichText.Content
						className="th-lyrics-active"
						tagName="div"
						value={ attributes.thLyrics }
					/>
					<RichText.Content
						className="en-lyrics-active"
						tagName="div"
						value={ attributes.enLyrics }
					/>
				</div>
				<div className="lyrics-wrapper">
					<RichText.Content
						className="th-lyrics"
						tagName="div"
						value={ attributes.thLyrics }
					/>
					<RichText.Content
						className="en-lyrics"
						tagName="div"
						value={ attributes.enLyrics }
					/>
				</div>
				{ attributes.mediaURL && <img src={ attributes.mediaURL } /> }
			</div>
		);
	},
} );
