<?php

function ap_get_color_hex($slug) {
    $map = array(
        'yellow' => '#F5D547',
        'blue'   => '#2D5BFF',
        'red'    => '#E63946',
        'green'  => '#2A9D8F',
        'violet' => '#7B2D8E',
        'black'  => '#1D1D1D',
    );
    return isset($map[$slug]) ? $map[$slug] : '#CCCCCC';
}

function ap_placeholder($post_id = null) {
    $hex = '#CCCCCC';

    if ($post_id) {
        $colors = wp_get_post_terms($post_id, 'gallery_color', array('fields' => 'slugs'));
        if (!is_wp_error($colors) && !empty($colors)) {
            $hex = ap_get_color_hex($colors[0]);
        }
    }

    $ratios = array('3/4', '4/3', '1/1', '16/9', '2/3');
    $ratio = $ratios[array_rand($ratios)];

    return sprintf(
        '<div class="ap-placeholder" style="background-color:%s;aspect-ratio:%s;"></div>',
        esc_attr($hex),
        esc_attr($ratio)
    );
}
