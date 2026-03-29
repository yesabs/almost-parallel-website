<?php get_header(); ?>

<?php
$args = array(
    'post_type'      => 'media_gallery',
    'posts_per_page' => 18,
    'orderby'        => 'rand',
);

$query = new WP_Query($args);
?>

<div class="ap-grid ap-grid--random">
    <?php if ($query->have_posts()) : ?>
        <?php while ($query->have_posts()) : $query->the_post(); ?>
            <?php
            $themes  = wp_get_post_terms(get_the_ID(), 'gallery_theme', array('fields' => 'slugs'));
            $colors  = wp_get_post_terms(get_the_ID(), 'gallery_color', array('fields' => 'slugs'));
            $projects = wp_get_post_terms(get_the_ID(), 'gallery_project', array('fields' => 'slugs'));

            $theme_attr   = !empty($themes) ? $themes[0] : '';
            $color_attr   = !empty($colors) ? $colors[0] : '';
            $project_attr = !empty($projects) ? $projects[0] : '';
            ?>
            <div class="ap-card"
                 data-theme="<?php echo esc_attr($theme_attr); ?>"
                 data-color="<?php echo esc_attr($color_attr); ?>"
                 data-project="<?php echo esc_attr($project_attr); ?>">
                <?php echo ap_placeholder(get_the_ID()); ?>
                <span class="ap-card__title"><?php the_title(); ?></span>
            </div>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
    <?php else : ?>
        <p>No gallery items found. Add some in the WordPress admin.</p>
    <?php endif; ?>
</div>

<?php get_footer(); ?>
