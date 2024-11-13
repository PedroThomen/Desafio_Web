import React from 'react';
import '../styles/about.css';

function About() {
  return (
    <section className="about">
      <div className="container about-content">
        <div data-aos="zoom-in" data-aos-delay="100">
          <img 
            src="/assets/images.svg" 
            alt="Imagem sobre a barbearia"
          />
        </div>

        <div 
          className="about-description"
          data-aos="zoom-out-left" 
          data-aos-delay="250"
        >
          <h2>Sobre</h2>
          <p>
            Bem-vindo à nossa barbearia especializada em estilos masculinos. Com mais de 10 anos 
            de experiência, oferecemos cortes modernos, degradês precisos e barbas impecáveis. 
            Nossa equipe de barbeiros especializados está pronta para transformar seu visual com 
            técnicas tradicionais e tendências contemporâneas. Aqui, cada corte é uma obra de arte, 
            e cada cliente recebe um atendimento personalizado para destacar sua personalidade.
          </p>
          <p>Horário de funcionamento: <strong>09:00</strong> às <strong>19:00</strong></p>
        </div>
      </div>
    </section>
  );
}

export default About; 