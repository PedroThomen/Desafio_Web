import React from 'react';
import '../styles/services.css';

function Services() {
  return (
    <section className="services">
      <div className="services-content container">
        <h2>Serviços</h2>
        <p>Confira os nossos serviços e escolha o que melhor se encaixa no seu estilo</p>
      </div>

      <section className="haircuts">
        <div className="haircut" data-aos="fade-up" data-aos-delay="150">
          <img src="/assets/corte1.png" alt="Corte degradê" />
          <div className="haircut-info">
            <strong>Corte Degradê</strong>
            <button>R$ 45,00</button>
          </div>
        </div>

        <div className="haircut" data-aos="fade-up" data-aos-delay="250">
          <img src="/assets/corte2.png" alt="Barba modelada" />
          <div className="haircut-info">
            <strong>Barba Modelada</strong>
            <button>R$ 35,00</button>
          </div>
        </div>

        <div className="haircut" data-aos="fade-up" data-aos-delay="400">
          <img src="/assets/corte3.png" alt="Corte degradê + barba" />
          <div className="haircut-info">
            <strong>Corte Degradê + Barba</strong>
            <button>R$ 85,00</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Services; 