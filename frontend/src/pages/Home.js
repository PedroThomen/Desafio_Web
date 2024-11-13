import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/home.css';
import About from '../components/About';
import Services from '../components/Services';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { auth } from '../services/firebase';
import LogoutButton from '../components/LogoutButton';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <div className="bg-home">
        <header>
          <nav className="header-content container">
            <div className="header-icons" data-aos="fade-down">
              <a href="https://www.instagram.com/suabarbearia" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram fa-2x"></i>
              </a>
              <a href="https://www.facebook.com/suabarbearia" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook fa-2x"></i>
              </a>
              <a href="https://www.tiktok.com/@suabarbearia" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-tiktok fa-2x"></i>
              </a>
            </div>

            <div className="header-logo" data-aos="fade-up" data-aos-delay="300">
              <img 
                data-aos="flip-up"
                data-aos-delay="300"
                data-aos-duration="1500"
                src={process.env.PUBLIC_URL + '/assets/logo.svg'} 
                alt="Logo da barbearia"
              />
            </div>

            <div className="header-actions" data-aos="fade-down">
              {user ? (
                <>
                  <div className="user-profile">
                    <i className="fa-regular fa-user user-icon"></i>
                    <span className="user-email">{user.email}</span>
                    <Link to="/editar-perfil" className="edit-profile-link">
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </div>
                  <Link to="/meus-agendamentos" className="header-button">
                    Agendamentos
                  </Link>
                  <LogoutButton />
                </>
              ) : (
                <Link to="/login" className="header-button">
                  Agendar
                </Link>
              )}
            </div>
          </nav>

          <main className="hero container" data-aos="fade-up" data-aos-delay="400">
            <h1>ESTILO É UM REFLEXO DA SUA ATITUDE E SUA PERSONALIDADE.</h1>
            <p>Horário de funcionamento: 09:00 às 19:00</p>
            {user ? (
              <Link to="/agendamento" className="button-contact">
                Agendar horário
              </Link>
            ) : (
              <Link to="/login" className="button-contact">
                Agendar horário
              </Link>
            )}
          </main>
        </header>
      </div>
      <About />
      <Services />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default Home; 