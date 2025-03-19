'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Instagram, MapPin, Clock, ChevronDown, X, Menu, ArrowRight, Phone, Mail } from 'lucide-react';

const NiyaBeautyWebsite = () => {
  // Gestion des états
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const cursorRef = useRef(null);

  // Références d'images
  const images = {
    // Image héro - utiliser une de vos meilleures images avec des boucles définies
    hero: "images/hero.png", 
    salonInterior: "images/hero.png", 
    stylingSession: "images/salon1.png", 
    curlDefinition: "images/tr1.png", 
    curlTreatment: "images/tr2.png", 
    curlCut: "images/tr3.png", 
    transform1: "images/hero.png", 
    transform2: "images/hero.png", 
    transform3: "images/hero.png", 
    gallery1: "images/bcl1.jpg",
    gallery2: "images/bcl2.jpg",
    gallery3: "images/bcl3.png",
    gallery4: "images/bcl4.png",
    gallery5: "images/bcl5.png",
    gallery6: "images/bcl6.png",
    gallery7: "images/bcl7.jpg",
    gallery8: "images/bcl6.png", 
    client1: "images/client2.png", 
    client2: "images/client1.jpg",
    client3: "images/client3.png",
    serviceBg: "images/image2.jpg", 
  };

  // Tableau de transformations présentant les résultats réels des clients
  const transformations = [
    { 
      before: "images/bcl4.png", 
      after: "images/image9.jpg",
      type: "Définition et Hydratation des Boucles" 
    },
    { 
      before: "images/image3.jpg", 
      after: "images/image4.jpg",
      type: "Balayage et Coupe Bouclée" 
    },
    { 
      before: "images/image8.jpg", 
      after: "images/image6.jpg",
      type: "Amélioration Naturelle des Boucles" 
    },
  ];

  // Données de témoignages
  const testimonials = [
    {
      quote: "Après des années de lutte avec mes boucles, trouver Niya Beauty a changé ma vie. Ils comprennent vraiment les cheveux bouclés d'une manière que je n'ai jamais expérimentée auparavant.",
      name: "Leila M.",
      image: images.client1
    },
    {
      quote: "Je ne savais pas que mes boucles pouvaient être aussi belles ! L'équipe de Niya Beauty m'a appris à prendre soin de mes boucles tout en me donnant la meilleure coupe et coiffure que j'aie jamais eues.",
      name: "Sarah T.",
      image: images.client2
    },
    {
      quote: "En tant que personne aux boucles de texture mixte, j'ai toujours eu du mal à trouver des coiffeurs qui comprennent mes cheveux. Niya Beauty a non seulement compris, mais a magnifiquement transformé mes boucles.",
      name: "Amina K.",
      image: images.client3
    }
  ];

  // Set up fade animations and fix the code that was initially causing black sections
  useEffect(() => {
    // Add a style tag to handle fade animations
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }
      
      .fade-in.active {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(styleTag);
    
    // Define function to handle fade-in animations
    const activateFadeElements = () => {
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach(element => {
        element.classList.add('active');
      });
    };
    
    // Immediately activate all fade elements
    activateFadeElements();
    
    // Also activate on scroll for elements that might load later
    window.addEventListener('scroll', activateFadeElements);
    
    // Set up a backup timer to ensure elements become visible
    const timer = setInterval(activateFadeElements, 300);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', activateFadeElements);
      clearInterval(timer);
      if (styleTag.parentNode) {
        styleTag.parentNode.removeChild(styleTag);
      }
    };
  }, []);

  // Handle broken images
  useEffect(() => {
    const handleImageError = (e) => {
      e.target.style.backgroundColor = '#333';
      e.target.style.minHeight = '100px';
      e.target.style.display = 'flex';
      e.target.style.alignItems = 'center';
      e.target.style.justifyContent = 'center';
      e.target.innerHTML = '<p style="color: #666; padding: 10px;">Image</p>';
    };
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('error', handleImageError);
    });
    
    return () => {
      images.forEach(img => {
        img.removeEventListener('error', handleImageError);
      });
    };
  }, []);

  // Carrousel automatique pour les témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Scroll listening
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouvement du curseur personnalisé (desktop only)
  useEffect(() => {
    // Only enable custom cursor on desktop
    if (window.innerWidth < 768) return;
    
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '40px';
        cursorRef.current.style.height = '40px';
        cursorRef.current.style.borderColor = '#e4a36f';
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = '20px';
        cursorRef.current.style.height = '20px';
        cursorRef.current.style.borderColor = '#d16ba5';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    const clickables = document.querySelectorAll('a, button, input, textarea, select');
    clickables.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clickables.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="font-['Montserrat'] antialiased min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* Curseur personnalisé - desktop only */}
      <div 
        ref={cursorRef} 
        className="fixed w-5 h-5 rounded-full border-2 border-[#d16ba5] pointer-events-none z-50 -ml-2.5 -mt-2.5 mix-blend-difference hidden md:block" 
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>
      
      {/* Barre supérieure - optimized for mobile */}
      <div className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] py-2 px-3 flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-white">
        <a href="mailto:hello@niyabeauty.com" className="flex items-center hover:opacity-80 transition-opacity">
          <Mail size={14} className="mr-1" />
          <span>hello@niyabeauty.com</span>
        </a>
        <a href="tel:+212123456789" className="flex items-center hover:opacity-80 transition-opacity">
          <Phone size={14} className="mr-1" />
          <span>+212 123 456 789</span>
        </a>
        <a href="https://instagram.com/niya.beauty.curly" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80 transition-opacity">
          <Instagram size={14} className="mr-1" />
          <span>@niya.beauty.curly</span>
        </a>
      </div>
      
      {/* Navigation - mobile optimized */}
      <nav className={`fixed w-full bg-black bg-opacity-95 backdrop-blur-sm z-40 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <a href="#accueil" className="text-xl md:text-2xl font-semibold tracking-wider text-white">
              <span className="font-serif font-light">NIYA</span>
              <span className="font-serif font-light bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent">BEAUTY</span>
            </a>
            
            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex space-x-5 text-xs uppercase tracking-wider">
                <a href="#accueil" className={`text-white hover:text-[#e4a36f] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#d16ba5] after:to-[#e4a36f] after:bottom-[-4px] after:left-0 after:transition-all hover:after:w-full ${activeSection === 'accueil' ? 'after:w-full' : ''}`}>
                  Accueil
                </a>
                <a href="#apropos" className={`text-white hover:text-[#e4a36f] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#d16ba5] after:to-[#e4a36f] after:bottom-[-4px] after:left-0 after:transition-all hover:after:w-full ${activeSection === 'apropos' ? 'after:w-full' : ''}`}>
                  À Propos
                </a>
                <a href="#services" className={`text-white hover:text-[#e4a36f] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#d16ba5] after:to-[#e4a36f] after:bottom-[-4px] after:left-0 after:transition-all hover:after:w-full ${activeSection === 'services' ? 'after:w-full' : ''}`}>
                  Services
                </a>
                <a href="#galerie" className={`text-white hover:text-[#e4a36f] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#d16ba5] after:to-[#e4a36f] after:bottom-[-4px] after:left-0 after:transition-all hover:after:w-full ${activeSection === 'galerie' ? 'after:w-full' : ''}`}>
                  Galerie
                </a>
                <a href="#contact" className={`text-white hover:text-[#e4a36f] transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#d16ba5] after:to-[#e4a36f] after:bottom-[-4px] after:left-0 after:transition-all hover:after:w-full ${activeSection === 'contact' ? 'after:w-full' : ''}`}>
                  Contact
                </a>
              </div>
              <a href="#reservation" className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] px-5 py-1.5 rounded text-xs uppercase tracking-wider font-medium hover:shadow-lg hover:shadow-[#d16ba5]/20 transition-all transform hover:-translate-y-1">
                Réservez
              </a>
            </div>
            
            {/* Bouton de menu mobile */}
            <button 
              className="md:hidden text-white text-xl p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Menu Mobile - full screen overlay */}
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-98 fixed inset-0 z-50 flex flex-col justify-center items-center">
            <button 
              className="absolute top-4 right-4 text-white text-2xl p-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col space-y-5 text-center">
              <a href="#accueil" onClick={() => setIsMenuOpen(false)} className="text-white text-lg">ACCUEIL</a>
              <a href="#apropos" onClick={() => setIsMenuOpen(false)} className="text-white text-lg">À PROPOS</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-white text-lg">SERVICES</a>
              <a href="#galerie" onClick={() => setIsMenuOpen(false)} className="text-white text-lg">GALERIE</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-white text-lg">CONTACT</a>
              <a 
                href="#reservation" 
                onClick={() => setIsMenuOpen(false)} 
                className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] px-8 py-2 rounded text-lg uppercase tracking-wider mt-4"
              >
                Réservez
              </a>
            </div>
          </div>
        )}
      </nav>
      
      {/* Section Héro - mobile optimized */}
      <section id="accueil" className="relative min-h-[90vh] flex items-center pt-16">
        <div className="absolute w-2/5 h-3/4 right-0 top-1/4 bg-gradient-to-r from-[#d16ba5]/30 to-[#e4a36f]/30 filter blur-[120px] rounded-full z-0"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
          <img
            src={images.hero}
            alt="Magnifiques cheveux bouclés"
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="fade-in">
              <h4 className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent uppercase tracking-widest text-xs font-medium mb-3">Coiffure sur mesure</h4>
              <h1 className="text-4xl md:text-6xl font-serif font-light leading-tight mb-4">
                L'Art des<br />
                <span className="relative">
                  Boucles Naturelles
                  <span className="absolute -bottom-2 left-0 h-1 w-3/4 bg-gradient-to-r from-[#d16ba5] to-[#e4a36f]"></span>
                </span>
              </h1>
              <p className="text-base opacity-90 max-w-lg mb-6 leading-relaxed">
                Premier salon premium du Maroc exclusivement dédié au soin, à la coiffure et à la transformation des cheveux bouclés.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="#reservation" 
                  className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] px-6 py-3 rounded-sm inline-flex items-center justify-between group text-center"
                >
                  <span className="text-sm tracking-widest uppercase font-medium">Réserver</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#galerie" 
                  className="border border-white/30 px-6 py-3 rounded-sm text-sm tracking-widest uppercase font-medium inline-flex items-center justify-between hover:text-[#e4a36f] hover:border-[#e4a36f] transition-all text-center"
                >
                  <span>Explorer la Galerie</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block">
              {/* Badge d'Expérience */}
              <div className="relative">
                <div className="absolute -right-12 top-20 bg-black/80 backdrop-blur-sm border border-[#d16ba5] p-4 rounded-lg z-20 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      <img src={images.client1} alt="Cliente" className="w-10 h-10 rounded-full border-2 border-white" />
                      <img src={images.client2} alt="Cliente" className="w-10 h-10 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <p className="font-medium">+10 Ans</p>
                      <p className="text-sm opacity-70">d'expertise</p>
                    </div>
                  </div>
                </div>
                
                {/* Badge Région */}
                <div className="absolute -left-8 top-60 bg-black/80 backdrop-blur-sm p-4 rounded-lg z-20 shadow-lg border border-[#e4a36f]">
                  <div className="flex items-center space-x-3">
                    <div className="text-[#e4a36f] text-2xl">
                      <MapPin />
                    </div>
                    <div>
                      <p className="font-medium">Marrakech, Maroc</p>
                      <p className="text-sm opacity-70">Emplacement Premium</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Icônes des Réseaux Sociaux */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 text-white/80">
          <a href="https://instagram.com/niya.beauty.curly" target="_blank" rel="noopener noreferrer" className="hover:text-[#e4a36f] hover:-translate-y-1 transition-all">
            <Instagram size={18} />
          </a>
          <a href="#" className="hover:text-[#e4a36f] hover:-translate-y-1 transition-all">
            <span className="w-4 h-4 inline-block">FB</span>
          </a>
          <a href="#" className="hover:text-[#e4a36f] hover:-translate-y-1 transition-all">
            <span className="w-4 h-4 inline-block">TW</span>
          </a>
          <div className="h-16 w-px bg-gradient-to-b from-[#d16ba5] to-[#e4a36f] mx-auto"></div>
        </div>
        
        {/* Indicateur de défilement */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <a href="#apropos" className="flex flex-col items-center text-white text-xs tracking-widest uppercase animate-bounce">
            <span className="mb-1">Défiler</span>
            <ChevronDown size={14} />
          </a>
        </div>
      </section>
      
      {/* Section Réservation - ENHANCED PREMIUM DESIGN */}
<section id="reservation" className="py-12 bg-gradient-to-r from-[#d16ba5]/90 to-[#e4a36f]/90 text-white relative overflow-hidden" style={{ clipPath: 'polygon(0 0, 100% 3%, 100% 100%, 0% 97%)' }}>
  <div className="absolute inset-0 bg-black/40 z-0"></div>
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
    <div className="absolute w-64 h-64 rounded-full bg-white/30 -top-20 -left-20 blur-2xl"></div>
    <div className="absolute w-96 h-96 rounded-full bg-white/20 bottom-0 right-0 blur-3xl"></div>
  </div>
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 fade-in">
        <span className="inline-block h-1 w-10 bg-white rounded mb-3"></span>
        <h3 className="text-2xl md:text-3xl font-serif font-light mb-3">Réservez Votre Expérience</h3>
        <p className="text-white/90 text-sm md:text-base max-w-lg mx-auto">
          Réservez dès maintenant pour une transformation exceptionnelle de vos boucles
        </p>
      </div>
      
      {/* Premium Reservation Form */}
      <div className="bg-black/60 backdrop-blur-lg p-6 md:p-8 text-white rounded-sm border border-white/20 shadow-xl relative fade-in transform transition-all hover:border-white/40 duration-500">
        {/* Decorative accent */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#d16ba5] to-[#e4a36f]"></div>
        
        <form className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative group">
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-white/5 border-b-2 border-[#d16ba5]/40 rounded-sm text-white placeholder-transparent focus:border-[#e4a36f] outline-none transition-all pt-5"
                placeholder="Votre nom"
                id="name-input"
              />
              <label 
                htmlFor="name-input" 
                className="absolute top-2 left-4 text-xs text-white/60 transition-all group-focus-within:text-[#e4a36f]"
              >
                Votre nom
              </label>
            </div>
            <div className="relative group">
              <input 
                type="tel" 
                className="w-full px-4 py-3 bg-white/5 border-b-2 border-[#d16ba5]/40 rounded-sm text-white placeholder-transparent focus:border-[#e4a36f] outline-none transition-all pt-5"
                placeholder="Votre téléphone"
                id="tel-input"
              />
              <label 
                htmlFor="tel-input" 
                className="absolute top-2 left-4 text-xs text-white/60 transition-all group-focus-within:text-[#e4a36f]"
              >
                Votre téléphone
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative group">
              <input 
                type="email" 
                className="w-full px-4 py-3 bg-white/5 border-b-2 border-[#d16ba5]/40 rounded-sm text-white placeholder-transparent focus:border-[#e4a36f] outline-none transition-all pt-5"
                placeholder="Votre email"
                id="email-input"
              />
              <label 
                htmlFor="email-input" 
                className="absolute top-2 left-4 text-xs text-white/60 transition-all group-focus-within:text-[#e4a36f]"
              >
                Votre email
              </label>
            </div>
            <div className="relative group">
              <select 
                className="w-full px-4 py-3 bg-white/5 border-b-2 border-[#d16ba5]/40 rounded-sm text-white focus:border-[#e4a36f] outline-none transition-all appearance-none cursor-pointer pt-5"
                id="service-select"
              >
                <option value="" className="text-black bg-gray-100">Choisissez un service</option>
                <option value="curl-definition" className="text-black">Définition & Coiffage des Boucles</option>
                <option value="curl-treatment" className="text-black">Traitement des Boucles</option>
                <option value="curl-cut" className="text-black">Coupe & Couleur pour Cheveux Bouclés</option>
              </select>
              <label 
                htmlFor="service-select" 
                className="absolute top-2 left-4 text-xs text-white/60 transition-all"
              >
                Service désiré
              </label>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#e4a36f]">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative group">
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-white/5 border-b-2 border-[#d16ba5]/40 rounded-sm text-white focus:border-[#e4a36f] outline-none transition-all pt-5"
                id="date-input"
              />
              <label 
                htmlFor="date-input" 
                className="absolute top-2 left-4 text-xs text-white/60 transition-all"
              >
                Date souhaitée
              </label>
            </div>
            <div className="relative group">
              <select 
                className="w-full px-4 py-3 bg-white/5 border-b-2 border-[#d16ba5]/40 rounded-sm text-white focus:border-[#e4a36f] outline-none transition-all appearance-none cursor-pointer pt-5"
                id="time-select"
              >
                <option value="" className="text-black">Choisissez l'heure</option>
                <option className="text-black">Matin (10h-13h)</option>
                <option className="text-black">Après-midi (13h-16h)</option>
                <option className="text-black">Soir (16h-20h)</option>
              </select>
              <label 
                htmlFor="time-select" 
                className="absolute top-2 left-4 text-xs text-white/60 transition-all"
              >
                Horaire préféré
              </label>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#e4a36f]">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
          
          <div className="relative group">
            <textarea 
              className="w-full px-4 py-3 bg-white/5 border-b-2 border-[#d16ba5]/40 rounded-sm text-white placeholder-transparent focus:border-[#e4a36f] outline-none transition-all pt-5 resize-none"
              placeholder="Demandes spéciales"
              id="message-input"
              rows={2}
            ></textarea>
            <label 
              htmlFor="message-input" 
              className="absolute top-2 left-4 text-xs text-white/60 transition-all group-focus-within:text-[#e4a36f]"
            >
              Demandes spéciales (optionnel)
            </label>
          </div>
          
          <button 
            type="submit" 
            className="w-full relative overflow-hidden group bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] py-3 rounded-sm font-medium tracking-widest uppercase text-sm transition-all duration-300 border border-transparent hover:border-white/50"
          >
            <span className="relative z-10">Confirmer ma Réservation</span>
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out opacity-10"></span>
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-0 translate-x-4 duration-300">
              <ArrowRight size={14} />
            </span>
          </button>
        </form>
      </div>
      
      {/* Contact Info Icons with enhanced styling */}
      <div className="mt-8 grid grid-cols-3 gap-2 text-center max-w-lg mx-auto">
        <div className="flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm p-3 rounded border border-white/10 hover:border-white/30 transition-all">
          <MapPin size={14} className="mb-2 text-[#e4a36f]" />
          <span className="text-xs">Marrakech, Maroc</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm p-3 rounded border border-white/10 hover:border-white/30 transition-all">
          <Clock size={14} className="mb-2 text-[#e4a36f]" />
          <span className="text-xs">Mar-Dim: 10h-20h</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm p-3 rounded border border-white/10 hover:border-white/30 transition-all">
          <Phone size={14} className="mb-2 text-[#e4a36f]" />
          <span className="text-xs">+212 123 456 789</span>
        </div>
      </div>
    </div>
  </div>
</section>
      
      {/* Section Témoignages - made more compact */}
      <section className="py-12 md:py-16 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/image2.jpg')] bg-cover opacity-5"></div>
        <div className="absolute w-64 h-64 bg-[#d16ba5]/10 rounded-full -right-32 bottom-0 filter blur-[80px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center mb-8 fade-in">
            <h4 className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent uppercase tracking-widest text-xs font-medium mb-2">Expériences Clientes</h4>
            <h3 className="text-2xl md:text-3xl font-serif font-light leading-tight">Ce que Nos Clientes Disent</h3>
          </div>
          
          <div className="relative max-w-3xl mx-auto">
            <div id="testimonial-slider" className="relative">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`testimonial-card transition-all duration-500 opacity-0 transform scale-90 absolute top-0 left-0 w-full ${currentSlide === index ? 'opacity-100 scale-100 relative' : ''}`}
                >
                  <div className="bg-[#111111] p-6 md:p-10 text-center rounded-sm border border-gray-800">
                    <div className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent text-4xl font-serif mb-4">"</div>
                    <p className="text-lg md:text-xl font-serif font-light italic text-gray-200 mb-6 leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-white">{testimonial.name}</h4>
                        <div className="flex text-[#e4a36f] text-sm">★★★★★</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Points de Navigation du Slider */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all ${
                    currentSlide === index 
                    ? 'w-10 h-2 bg-gradient-to-r from-[#d16ba5] to-[#e4a36f]' 
                    : 'w-6 h-2 bg-gray-700 hover:bg-[#e4a36f]/50'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Galerie Instagram - compressed for mobile */}
      <section id="galerie" className="py-12 md:py-16 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 fade-in">
            <div>
              <h4 className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent uppercase tracking-widest text-xs font-medium mb-2">Notre Galerie</h4>
              <h3 className="text-2xl md:text-3xl font-serif font-light leading-tight">Inspiration pour Boucles</h3>
            </div>
            <a 
              href="https://www.instagram.com/niya.beauty.curly/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 inline-flex items-center bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent text-sm font-medium"
            >
              <Instagram size={16} className="mr-1 text-[#e4a36f]" />
              <span>@niya.beauty.curly</span>
            </a>
          </div>
          
          {/* Grille de la Galerie */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 fade-in">
            {/* Images de la galerie utilisant les références d'images */}
            {[
              images.gallery1, images.gallery2, images.gallery3, images.gallery4,
              images.gallery5, images.gallery6, images.gallery7, images.gallery8
            ].map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-sm">
                <img 
                  src={image} 
                  alt={`Image de galerie ${index + 1}`} 
                  className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="text-white" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Brand Quote - shortened */}
      <section className="py-10 md:py-14 bg-black relative overflow-hidden">
        <div className="absolute w-64 h-64 bg-[#d16ba5]/10 rounded-full -left-20 top-10 filter blur-[80px]"></div>
        <div className="absolute w-64 h-64 bg-[#e4a36f]/10 rounded-full -right-20 bottom-0 filter blur-[80px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <h2 className="text-xl md:text-3xl font-serif font-light mb-4 leading-relaxed">
              "Nous ne coiffons pas simplement les cheveux bouclés —<span className="md:hidden"><br /></span>
              <span className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent font-serif italic">nous célébrons leur beauté naturelle."</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] mx-auto mt-6"></div>
          </div>
        </div>
      </section>
      
      {/* Section À Propos - compressed */}
      <section id="apropos" className="py-12 md:py-16 bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute w-64 h-64 bg-[#d16ba5]/5 rounded-full -right-32 top-0 filter blur-[80px]"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="fade-in">
              <h4 className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent uppercase tracking-widest text-xs font-medium mb-2">Notre Histoire</h4>
              <h3 className="text-2xl md:text-3xl font-serif font-light mb-4 leading-tight">Première Destination<span className="md:hidden"><br /></span> des Cheveux Bouclés au Maroc</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                Fondé avec passion et expertise, Niya Beauty est né d'une vision simple mais puissante : créer le premier havre spécialisé pour les cheveux bouclés au Maroc.
              </p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                Dans un monde où les cheveux lisses dominent souvent les standards de beauté, nous croyons en la beauté distincte des boucles naturelles.
              </p>
              <a href="#equipe" className="inline-flex items-center text-[#e4a36f] text-sm font-medium group">
                <span className="border-b border-[#d16ba5] pb-1 group-hover:border-[#e4a36f] transition-colors">Rencontrez Nos Spécialistes</span>
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            {/* Grille d'Images avec Photos Réelles du Salon */}
            <div className="grid grid-cols-2 gap-3 relative fade-in">
              <div className="col-span-2 relative aspect-[4/3] overflow-hidden rounded">
                <img 
                  src={images.salonInterior} 
                  alt="Intérieur du Salon Niya Beauty" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded">
                <img 
                  src={images.stylingSession} 
                  alt="Session de coiffage de cheveux bouclés" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded">
                <img 
                  src={transformations[0].before} 
                  alt="Postes de coiffage du salon" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Éléments d'accent flottants - desktop only */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] rounded-sm hidden md:block"></div>
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-[#e4a36f] hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Services - optimized */}
      <section id="services" className="py-12 md:py-16 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('/image2.jpg')] bg-cover opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mb-8 fade-in">
            <h4 className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent uppercase tracking-widest text-xs font-medium mb-2">Notre Expertise</h4>
            <h3 className="text-2xl md:text-3xl font-serif font-light mb-3 leading-tight">Services Spécialisés pour Chaque Type de Boucles</h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Chaque service est adapté à votre type de boucles unique, utilisant des produits et techniques premium.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Service 1 */}
            <div className="bg-[#111111] rounded-sm overflow-hidden border border-gray-800 hover:border-[#d16ba5]/50 transition-all hover:-translate-y-1 duration-500 fade-in">
              <div className="p-4 md:p-6">
                <div className="h-40 md:h-48 overflow-hidden mb-4 rounded">
                  <img 
                    src={images.curlDefinition} 
                    alt="Définition des Boucles" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>
                <h4 className="text-lg font-medium mb-2">Définition & Coiffage des Boucles</h4>
                <p className="text-gray-400 text-sm mb-4">Définissez et améliorez votre motif de boucles naturel avec nos techniques de coiffage signature.</p>
                <div className="flex justify-between items-center">
                  <span className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent font-medium">À partir de 350 MAD</span>
                  <a href="#reservation" className="text-white font-medium flex items-center group">
                    <span>Réserver</span>
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Service 2 */}
            <div className="bg-[#111111] rounded-sm overflow-hidden border border-gray-800 hover:border-[#d16ba5]/50 transition-all hover:-translate-y-1 duration-500 fade-in">
              <div className="p-4 md:p-6">
                <div className="h-40 md:h-48 overflow-hidden mb-4 rounded">
                  <img 
                    src={images.curlTreatment} 
                    alt="Traitement des Boucles" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>
                <h4 className="text-lg font-medium mb-2">Traitement de Transformation</h4>
                <p className="text-gray-400 text-sm mb-4">Restaurez la vitalité des boucles abîmées avec notre traitement intensif d'hydratation et de réparation.</p>
                <div className="flex justify-between items-center">
                  <span className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent font-medium">À partir de 500 MAD</span>
                  <a href="#reservation" className="text-white font-medium flex items-center group">
                    <span>Réserver</span>
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Service 3 */}
            <div className="bg-[#111111] rounded-sm overflow-hidden border border-gray-800 hover:border-[#d16ba5]/50 transition-all hover:-translate-y-1 duration-500 fade-in">
              <div className="p-4 md:p-6">
                <div className="h-40 md:h-48 overflow-hidden mb-4 rounded">
                  <img 
                    src={images.curlCut}
                    alt="Coupe et Couleur Bouclée" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                </div>
                <h4 className="text-lg font-medium mb-2">Coupe & Couleur pour Cheveux Bouclés</h4>
                <p className="text-gray-400 text-sm mb-4">Découvrez une coupe et une couleur spécialement conçues pour mettre en valeur vos boucles.</p>
                <div className="flex justify-between items-center">
                  <span className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent font-medium">À partir de 450 MAD</span>
                  <a href="#reservation" className="text-white font-medium flex items-center group">
                    <span>Réserver</span>
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Contact - optimized for mobile */}
      <section id="contact" className="py-12 md:py-16 bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute w-64 h-64 bg-[#d16ba5]/5 rounded-full -left-32 bottom-0 filter blur-[80px]"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="fade-in">
              <h4 className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent uppercase tracking-widest text-xs font-medium mb-2">Contactez-Nous</h4>
              <h3 className="text-2xl md:text-3xl font-serif font-light mb-4 leading-tight">Nous Sommes à Votre Écoute</h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                Que vous ayez des questions sur nos services ou souhaitiez planifier une consultation, notre équipe est prête à vous aider.
              </p>
              
              <div className="space-y-4 max-w-md">
                <div className="flex items-start">
                  <div className="bg-[#d16ba5]/10 p-2 rounded-full mr-3">
                    <MapPin size={16} className="text-[#e4a36f]" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Adresse</h4>
                    <p className="text-gray-400 text-sm">123 Avenue Mohammed V, Guéliz, Marrakech</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#d16ba5]/10 p-2 rounded-full mr-3">
                    <Phone size={16} className="text-[#e4a36f]" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Téléphone</h4>
                    <p className="text-gray-400 text-sm">+212 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#d16ba5]/10 p-2 rounded-full mr-3">
                    <Mail size={16} className="text-[#e4a36f]" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-sm">Email</h4>
                    <p className="text-gray-400 text-sm">hello@niyabeauty.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <a href="https://instagram.com/niya.beauty.curly" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#e4a36f] transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#e4a36f] transition-colors">
                  <span className="w-4 h-4 inline-block">FB</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#e4a36f] transition-colors">
                  <span className="w-4 h-4 inline-block">TW</span>
                </a>
              </div>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-gray-800 rounded-sm p-5 md:p-6 fade-in">
              <h4 className="text-lg font-medium mb-4">Envoyez-Nous un Message</h4>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:border-[#e4a36f] outline-none transition-colors"
                    placeholder="Votre nom"
                  />
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:border-[#e4a36f] outline-none transition-colors"
                    placeholder="Votre email"
                  />
                </div>
                
                <select className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-sm text-white focus:border-[#e4a36f] outline-none transition-colors">
                  <option value="" className="text-black">Sélectionnez un sujet</option>
                  <option value="appointment" className="text-black">Réservation</option>
                  <option value="service" className="text-black">Question sur les Services</option>
                  <option value="other" className="text-black">Autre Demande</option>
                </select>
                
                <textarea 
                  className="w-full px-3 py-2 bg-white/5 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:border-[#e4a36f] outline-none transition-colors"
                  placeholder="Comment pouvons-nous vous aider ?"
                  rows={3}
                ></textarea>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] py-3 rounded-sm font-medium tracking-widest uppercase text-sm hover:shadow-lg hover:shadow-[#d16ba5]/20 transition-all transform hover:-translate-y-1"
                >
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - simplified */}
      <footer className="bg-black text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <a href="#accueil" className="text-2xl font-serif tracking-wider mb-4 inline-block">
                <span className="font-light">NIYA</span>
                <span className="bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent">BEAUTY</span>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Premier salon spécialisé du Maroc dédié à la transformation et à la célébration de la beauté naturelle des boucles.
              </p>
              <div className="flex space-x-4">
                <a href="https://instagram.com/niya.beauty.curly" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#e4a36f] hover:-translate-y-1 transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#e4a36f] hover:-translate-y-1 transition-all">
                  <span className="w-4 h-4 inline-block">FB</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#e4a36f] hover:-translate-y-1 transition-all">
                  <span className="w-4 h-4 inline-block">TW</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-3">Liens Rapides</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#accueil" className="text-gray-400 hover:text-[#e4a36f] transition-colors">Accueil</a>
                </li>
                <li>
                  <a href="#apropos" className="text-gray-400 hover:text-[#e4a36f] transition-colors">À Propos</a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-[#e4a36f] transition-colors">Services</a>
                </li>
                <li>
                  <a href="#galerie" className="text-gray-400 hover:text-[#e4a36f] transition-colors">Galerie</a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-[#e4a36f] transition-colors">Contact</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-3">Nos Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#services" className="text-gray-400 hover:text-[#e4a36f] transition-colors">Définition des Boucles</a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-[#e4a36f] transition-colors">Traitement des Boucles</a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-[#e4a36f] transition-colors">Coupe & Couleur</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-base mb-3">Heures d'Ouverture</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-400">Lundi</span>
                  <span className="text-white">Fermé</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Mar - Ven</span>
                  <span className="text-white">10:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Weekend</span>
                  <span className="text-white">09:00 - 21:00</span>
                </li>
              </ul>
              
              <div className="mt-4">
                <a 
                  href="#reservation" 
                  className="inline-flex items-center bg-gradient-to-r from-[#d16ba5] to-[#e4a36f] bg-clip-text text-transparent text-sm font-medium"
                >
                  <span>Réserver un Rendez-vous</span>
                  <ArrowRight size={14} className="ml-2 text-[#e4a36f]" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs">© 2025 Niya Beauty. Tous droits réservés.</p>
            <div className="mt-2 md:mt-0">
              <ul className="flex space-x-4 text-xs text-gray-500">
                <li>
                  <a href="#" className="hover:text-[#e4a36f] transition-colors">Politique de Confidentialité</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#e4a36f] transition-colors">Conditions d'Utilisation</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NiyaBeautyWebsite;