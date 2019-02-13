<?php
/**
 * Plugin Name: Hello Gutenberg
 * Description: Hello Gutenberg.
 * Version: 1.0.0
 * Author: notjiam
 */

function hello_gutenberg_enqueue_block_editor_assets(){
    wp_register_script(
		  'hello-gutenberg',
		  plugins_url( 'block.js', __FILE__ ),
      array( 'wp-blocks', 'wp-editor' ),
      filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
    );

    wp_register_style(
		  'hello-gutenberg-style',
		  plugins_url( 'style.css', __FILE__ ),
      array( ),
      filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    wp_register_style(
		  'hello-gutenberg-style-editor',
		  plugins_url( 'style-editor.css', __FILE__ ),
      array( ),
      filemtime( plugin_dir_path( __FILE__ ) . 'style-editor.css' )
    );
    
    
    register_block_type( 'hello-gutenberg/hello-gutenberg', array(
		  'editor_script' => 'hello-gutenberg',
		  'style' => 'hello-gutenberg-style',
		  'editor_style' => 'hello-gutenberg-style-editor'
	) );
}

add_action( 'init', 'hello_gutenberg_enqueue_block_editor_assets', 10, 1 );