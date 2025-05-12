import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const scrollToTariffs = () => {
    const tariffsSection = document.getElementById('tariffs');
    tariffsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="auth-header">
        <div className="auth-buttons">
          <Link to="/login" className="btn">Логін</Link>
          <Link to="/register" className="btn btn-secondary">Реєстрація</Link>
        </div>
      </header>

      <main className="home-container">
        {/* Секція вітання */}
        <section className="welcome-section">
          <h1>Ласкаво просимо до Insurance Company</h1>
          <p className="lead">
            Ми пропонуємо найкращі страхові послуги для вас та вашої родини.
          </p>
          <button onClick={scrollToTariffs} className="welcome-btn">
            Дізнатися більше про поліси
          </button>
        </section>

        {/* Контентні секції */}
        <div className="content-sections">
          {/* Секція "Про нас" */}
          <section className="content-section about-section">
            <h2>Про нас</h2>
            <p>
              Наша компанія спеціалізується на страхуванні авто. 
              Ми пропонуємо індивідуальний підхід до кожного клієнта.
            </p>
          </section>

          {/* Секція тарифів */}
          <section id="tariffs" className="content-section tariffs-section">
            <h2>Наші тарифи</h2>
            <div className="tariffs-cards">
              <div className="tariff-card">
                <h3>Базовий</h3>
                <p>✔ Страхування від ДТП</p>
                <p>✔ Страхування від пожежі</p>
                <p>✖ Страхування від викрадення</p>
                <p className="tariff-price">від 1500 грн/рік</p>
              </div>
              <div className="tariff-card">
                <h3>Стандарт</h3>
                <p>✔ Страхування від ДТП</p>
                <p>✔ Страхування від пожежі</p>
                <p>✔ Страхування від викрадення</p>
                <p className="tariff-price">від 2500 грн/рік</p>
              </div>
              <div className="tariff-card">
                <h3>Преміум</h3>
                <p>✔ Повне страхування</p>
                <p>✔ Юридична підтримка</p>
                <p>✔ Допомога на дорозі</p>
                <p className="tariff-price">від 4000 грн/рік</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}