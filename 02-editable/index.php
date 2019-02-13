<?php
/**
 * Plugin Name: Editable Block
 * Description: Editable Block.
 * Version: 1.0.0
 * Author: notjiam
 */

function editable_enqueue_block_editor_assets(){
    wp_register_script(
		  'editable',
		  plugins_url( 'block.js', __FILE__ ),
      array( 'wp-blocks', 'wp-editor' ),
      filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
    );

    wp_register_style(
		  'editable-style',
		  plugins_url( 'style.css', __FILE__ ),
      array( ),
      filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );

    wp_register_style(
		  'editable-style-editor',
		  plugins_url( 'style-editor.css', __FILE__ ),
      array( ),
      filemtime( plugin_dir_path( __FILE__ ) . 'style-editor.css' )
    );
    
    register_block_type( 'editable/editable', array(
		  'editor_script' => 'editable',
		  'style' => 'editable-style',
		  'editor_style' => 'editable-style-editor'
	) );
}

add_action( 'init', 'editable_enqueue_block_editor_assets', 10, 1 );