<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enrique Martinez Vargas - Chemical Engineer</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Chemical Engineer with 6+ years of experience in industrial processes, operations optimization, and sustainable solutions.">
    <meta name="keywords" content="Chemical Engineer, Manufacturing Engineer, Ingeniero Químico, Monterrey">
    <meta name="author" content="Enrique Martinez Vargas">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="picture/face.png">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Styles -->
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/components.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/animations.css">
    <link rel="stylesheet" href="css/themes.css">
</head>
<body>
    <!-- PHP Include Example (if server supports PHP) -->
    <?php include 'html-components/navbar.html'; ?>
    <?php include 'html-components/hero.html'; ?>
    <?php include 'html-components/about.html'; ?>
    <?php include 'html-components/experience.html'; ?>
    <?php include 'html-components/education.html'; ?>
    <?php include 'html-components/skills.html'; ?>
    <?php include 'html-components/certifications.html'; ?>
    <?php include 'html-components/contact.html'; ?>
    <?php include 'html-components/footer.html'; ?>

    <!-- Back to Top Button -->
    <button class="back-to-top" onclick="scrollToTop()">
        <i class="fas fa-arrow-up"></i>
    </button>

    <script>
        // Back to top
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            const backToTop = document.querySelector('.back-to-top');
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    </script>
</body>
</html>
