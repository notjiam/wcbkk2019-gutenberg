<?php
/**
 * Plugin Name: Karaoke Block
 * Description: Karaoke Block.
 * Version: 1.0.0
 * Author: notjiam
 */

function karaoke_enqueue_block_editor_assets(){
    wp_register_script(
			'karaoke-block',
			plugins_url( 'block.js', __FILE__ ),
      array( 'wp-blocks', 'wp-editor' ),
      filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
    );
		
		wp_register_style(
			'karaoke-block-style',
			plugins_url( 'style.css', __FILE__ ),
			array( ),
			filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );
		
		wp_register_style(
			'karaoke-block-style-editor',
			plugins_url( 'style-editor.css', __FILE__ ),
			array( ),
			filemtime( plugin_dir_path( __FILE__ ) . 'style-editor.css' )
		);
    
    register_block_type( 'karaoke/karaoke-block', array(
      'editor_script' => 'karaoke-block',
      'style' => 'karaoke-block-style',
      'editor_style' => 'karaoke-block-style-editor'
	) );
}

add_action( 'init', 'karaoke_enqueue_block_editor_assets', 10, 1 );