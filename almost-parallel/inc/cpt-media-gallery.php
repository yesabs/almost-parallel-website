<?php

function ap_register_media_gallery() {
    register_post_type('media_gallery', array(
        'labels' => array(
            'name'               => 'Media Gallery',
            'singular_name'      => 'Media Gallery Item',
            'add_new'            => 'Add New',
            'add_new_item'       => 'Add New Item',
            'edit_item'          => 'Edit Item',
            'view_item'          => 'View Item',
            'all_items'          => 'All Items',
            'search_items'       => 'Search Items',
            'not_found'          => 'No items found.',
            'not_found_in_trash' => 'No items found in Trash.',
        ),
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => array('slug' => 'gallery'),
        'supports'     => array('title', 'thumbnail', 'editor'),
        'menu_icon'    => 'dashicons-format-gallery',
        'show_in_rest' => true,
    ));

    register_taxonomy('gallery_theme', 'media_gallery', array(
        'labels' => array(
            'name'          => 'Themes',
            'singular_name' => 'Theme',
            'search_items'  => 'Search Themes',
            'all_items'     => 'All Themes',
            'edit_item'     => 'Edit Theme',
            'add_new_item'  => 'Add New Theme',
        ),
        'hierarchical'      => false,
        'public'            => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'theme'),
    ));

    register_taxonomy('gallery_color', 'media_gallery', array(
        'labels' => array(
            'name'          => 'Colors',
            'singular_name' => 'Color',
            'search_items'  => 'Search Colors',
            'all_items'     => 'All Colors',
            'edit_item'     => 'Edit Color',
            'add_new_item'  => 'Add New Color',
        ),
        'hierarchical'      => false,
        'public'            => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'color'),
    ));

    register_taxonomy('gallery_project', 'media_gallery', array(
        'labels' => array(
            'name'          => 'Projects',
            'singular_name' => 'Project',
            'search_items'  => 'Search Projects',
            'all_items'     => 'All Projects',
            'edit_item'     => 'Edit Project',
            'add_new_item'  => 'Add New Project',
        ),
        'hierarchical'      => true,
        'public'            => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'project'),
    ));
}
add_action('init', 'ap_register_media_gallery');

function ap_insert_default_terms() {
    if (get_option('ap_default_terms_inserted')) {
        return;
    }

    $themes = array('concept', 'execution', 'interior', 'furniture', 'photography', 'objects', 'research', 'illustration', 'site');
    foreach ($themes as $term) {
        if (!term_exists($term, 'gallery_theme')) {
            wp_insert_term(ucfirst($term), 'gallery_theme', array('slug' => $term));
        }
    }

    $colors = array('yellow', 'blue', 'red', 'green', 'violet', 'black');
    foreach ($colors as $term) {
        if (!term_exists($term, 'gallery_color')) {
            wp_insert_term(ucfirst($term), 'gallery_color', array('slug' => $term));
        }
    }

    update_option('ap_default_terms_inserted', true);
}
add_action('after_switch_theme', 'ap_insert_default_terms');
add_action('init', 'ap_insert_default_terms');
