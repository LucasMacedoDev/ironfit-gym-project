/**
 * IronFit Gym - Script Principal
 * Funcionalidades: Menu Mobile, Header Scroll, FAQ Accordion, 
 * Scroll Suave, Back to Top e Intersection Observer Animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Seleção de Elementos
    const header = document.querySelector('#header');
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const faqItems = document.querySelectorAll('.faq-item');
    const backToTopBtn = document.querySelector('#back-to-top');
    const animatedElements = document.querySelectorAll('.section-animate');

    // 2. Menu Mobile
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Previne scroll do body quando menu está aberto
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'initial';
    };

    hamburger.addEventListener('click', toggleMenu);

    // Fecha menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 3. Header Change on Scroll
    const headerScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // 4. Back to Top Button Visibility
    const toggleBackToTop = () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    };

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. Active Link on Scroll
    const activeLinkOnScroll = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    };

    // 6. FAQ Accordion
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Fecha todos os outros itens (opcional)
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Abre o atual se não estava aberto
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    // 7. Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Event Listeners de Scroll
    window.addEventListener('scroll', () => {
        headerScroll();
        toggleBackToTop();
        activeLinkOnScroll();
    });

    // Executa uma vez no load para garantir estado inicial
    headerScroll();
    toggleBackToTop();
});
