<?php

require_once get_template_directory() . '/inc/cpt-media-gallery.php';
require_once get_template_directory() . '/inc/placeholder.php';

function ap_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'ap_theme_setup');

function ap_enqueue_assets() {
    wp_enqueue_style('ap-reset', get_template_directory_uri() . '/css/reset.css', array(), '1.0.0');
    wp_enqueue_style('ap-layout', get_template_directory_uri() . '/css/layout.css', array('ap-reset'), '1.0.0');
    wp_enqueue_style('ap-style', get_stylesheet_uri(), array('ap-layout'), '1.0.0');
    wp_enqueue_script('ap-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'ap_enqueue_assets');
