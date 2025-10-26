import Image from 'next/image'
import RegistrationForm from '@/components/RegistrationForm'

export default function Home() {
  return (
    <>
      {/* Header */}
      <header>
        <nav className="navbar">
          <div className="logo">
            <Image
              src="/logo_story_mapp.png"
              alt="StoryMapp"
              className="logo-image"
              width={120}
              height={40}
              priority
            />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          {/* Left - Main Content */}
          <div className="hero-center">
            <h1 className="hero-title">
              A próxima geração<br/>
              do mercado de<br/>
              roteiros começa aqui.
            </h1>
            <p className="hero-description">
              Entre na comunidade <strong>StoryMapp</strong> e receba, em primeira mão, conteúdos, cursos e oportunidades que vão acelerar seu próximo projeto — e saiba, em primeira mão, sobre o lançamento da nossa plataforma de avaliação de roteiros (em breve).
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="hero-right">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <p className="cta-subtitle">O QUE VOCÊ ENCONTRA NA STORYMAPP?</p>
        <h2 className="cta-title">
          Aprimore seu roteiro. Amplie sua rede.<br/>
          Encontre as melhores oportunidades.
        </h2>
        <p className="cta-description">
          A <strong>StoryMapp</strong> conecta comunidades, formação, colaboração e avaliação para transformar boas ideias em projetos com futuro.
        </p>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="feature-card feature-card-blue">
            <div className="feature-icon">
              <Image
                src="/img_icone_conexao.png"
                alt="Comunidade"
                className="feature-image"
                width={60}
                height={60}
              />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Comunidade de Roteiristas</h3>
              <p className="feature-description">
                Espaço para trocar referências, tirar dúvidas e fazer conexões reais com quem escreve, produz e avalia. Networking de verdade, sem ruído.
              </p>
            </div>
          </div>

          <div className="feature-card feature-card-purple">
            <div className="feature-icon">
              <Image
                src="/img_especialistas.png"
                alt="Especialistas"
                className="feature-image"
                width={60}
                height={60}
              />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Cursos e eventos de formação</h3>
              <p className="feature-description">
                Trilhas práticas e exclusivas para você aprimorar técnica, visão de negócio e apresentação de projetos.
              </p>
            </div>
          </div>

          <div className="feature-card feature-card-pink">
            <div className="feature-icon">
              <Image
                src="/img_festivais.png"
                alt="Festivais"
                className="feature-image"
                width={60}
                height={60}
              />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">Publicações, tendências e concursos</h3>
              <p className="feature-description">
                Relatórios exclusivos, análises e curadoria de editais, festivais e labs parceiros ou inéditos: tudo num só lugar para você não perder prazos e enxergar movimentos do setor.
              </p>
            </div>
          </div>

          <div className="feature-card feature-card-blue-dark">
            <div className="feature-icon">
              <Image
                src="/img_icone_avaliacao_profissional.png"
                alt="Avaliação Profissional"
                className="feature-image"
                width={60}
                height={60}
              />
            </div>
            <div className="feature-content">
              <h3 className="feature-title">
                Plataforma de Avaliação de Roteiros <span className="em-breve">(em breve)</span>
              </h3>
              <p className="feature-description">
                Diagnósticos visuais, pareceres e metodologia própria de inteligência narrativa para elevar seu roteiro com clareza e direção. <strong>Cadastre-se para ser avisado antes de todo mundo.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <Image
                src="/logo_story_mapp.png"
                alt="StoryMapp"
                className="logo-image-footer"
                width={120}
                height={40}
              />
            </div>
            <p className="footer-copyright">© 2025 StoryMapp - Todos os direitos reservados</p>
          </div>

          <div className="footer-center">
            <a href="#" className="footer-link">Termos de Serviço</a>
            <a href="#" className="footer-link">Política de Privacidade</a>
          </div>

          <div className="footer-right">
            <p className="footer-social-title">Siga a StoryMapp:</p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M19.633 3.768a8.227 8.227 0 01-2.36.648 4.115 4.115 0 001.804-2.27 8.243 8.243 0 01-2.606.996A4.103 4.103 0 0013.558 2c-2.27 0-4.108 1.84-4.108 4.108 0 .322.036.635.106.935-3.414-.171-6.44-1.806-8.465-4.29a4.096 4.096 0 00-.556 2.066c0 1.425.725 2.683 1.827 3.42a4.088 4.088 0 01-1.86-.513v.052c0 1.99 1.415 3.65 3.293 4.027a4.117 4.117 0 01-1.853.07c.522 1.63 2.038 2.816 3.833 2.85a8.238 8.238 0 01-5.096 1.756c-.331 0-.658-.019-.978-.057a11.617 11.617 0 006.29 1.843c7.547 0 11.675-6.252 11.675-11.675 0-.178-.004-.355-.012-.531a8.34 8.34 0 002.048-2.125z"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M10 0C4.477 0 0 4.477 0 10c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.744 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S15.523 0 10 0z"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM8 14V6l8 3.993L8 14z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
