<?php get_header(); ?>

<?php
$args = array(
    'post_type'      => 'media_gallery',
    'posts_per_page' => 24,
);

$query = new WP_Query($args);
?>

<div class="ap-grid ap-grid--random">
    <?php if ($query->have_posts()) : ?>
        <?php while ($query->have_posts()) : $query->the_post(); ?>
            <div class="ap-card">
                <?php echo ap_placeholder(get_the_ID()); ?>
                <span class="ap-card__title"><?php the_title(); ?></span>
            </div>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>
    <?php else : ?>
        <p>No gallery items found.</p>
    <?php endif; ?>
</div>

<?php get_footer(); ?>
