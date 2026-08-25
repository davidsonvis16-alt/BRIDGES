import React from 'react';
import cheesyFriedChicken from '../assets/images/cheesy_fried_chicken_1787668490131.jpg';
import beefTacos from '../assets/images/beef_tacos_platter_1787668525260.jpg';
import cobbSalad from '../assets/images/cobb_salad_platter_1787668507356.jpg';

const YELLOW = '#FFC629';
const YELLOW_DARK = '#F0B300';
const BLACK = '#171412';
const RED = '#E8491D';
const WHITE = '#FFFFFF';

const cards = [
  {
    id: 'quesadilla',
    eyebrow: 'Today only',
    offer: 'Buy 1 get 1 half price',
    headline: ['CRUNCH INTO', 'CRAVINGS'],
    name: 'Loaded Chicken Quesadilla',
    image: cheesyFriedChicken,
    rating: '4.8',
    reviews: '320',
    price: '650',
  },
  {
    id: 'tacos',
    eyebrow: 'Weekday deal',
    offer: 'Free delivery over KES 1,000',
    headline: ['TACO', "O'CLOCK"],
    name: 'Sizzling Street Tacos (3pc)',
    image: beefTacos,
    rating: '4.6',
    reviews: '210',
    price: '480',
  },
  {
    id: 'bowl',
    eyebrow: 'Combo',
    offer: 'Includes a chilled Pepsi',
    headline: ['BOWLED', 'OVER'],
    name: 'Crispy Chicken & Mash Bowl',
    image: cobbSalad,
    rating: '4.9',
    reviews: '540',
    price: '750',
  },
];

interface PromoCardProps {
  card: typeof cards[0];
  key?: React.Key;
}

function PromoCard({ card }: PromoCardProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 380,
        height: 520,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 24px 48px rgba(23,20,18,0.35)',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img
        src={card.image}
        alt={card.name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(23,20,18,0.25) 0%, rgba(23,20,18,0.0) 35%, rgba(23,20,18,0.0) 55%, rgba(23,20,18,0.92) 100%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, padding: '20px 20px 0', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span
            style={{
              background: YELLOW,
              color: BLACK,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.8,
              textTransform: 'uppercase',
              padding: '6px 12px',
              borderRadius: 999,
            }}
          >
            {card.eyebrow}
          </span>
          <span
            style={{
              background: RED,
              color: WHITE,
              fontSize: 11,
              fontWeight: 800,
              padding: '6px 12px',
              borderRadius: 999,
            }}
          >
            {card.offer}
          </span>
        </div>

        <div style={{ flex: 1 }} />

        <h2
          style={{
            margin: 0,
            color: WHITE,
            fontSize: 44,
            lineHeight: 0.95,
            fontWeight: 900,
            letterSpacing: -1,
            textTransform: 'uppercase',
            textShadow: '0 4px 12px rgba(23,20,18,0.45)',
          }}
        >
          {card.headline[0]}
          <br />
          {card.headline[1]}
        </h2>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          background: BLACK,
          padding: '18px 22px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {card.name}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <span style={{ color: YELLOW, fontSize: 13, fontWeight: 900 }}>★ {card.rating}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>({card.reviews})</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              From
            </p>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 900, color: YELLOW, lineHeight: 1 }}>
              KES {card.price}
            </p>
          </div>
        </div>

        <button
          style={{
            width: '100%',
            background: RED,
            color: WHITE,
            border: 'none',
            borderRadius: 999,
            padding: '14px 0',
            fontSize: 15,
            fontWeight: 800,
            cursor: 'pointer',
            letterSpacing: 0.3,
            transition: 'transform 150ms ease, box-shadow 150ms ease, background-color 150ms ease',
            transform: 'translateY(0)',
            boxShadow: '0 4px 12px rgba(232,73,29,0.35)',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(2px) scale(0.98)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(232,73,29,0.25)';
            e.currentTarget.style.backgroundColor = '#c7421a';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(232,73,29,0.35)';
            e.currentTarget.style.backgroundColor = RED;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(232,73,29,0.35)';
            e.currentTarget.style.backgroundColor = RED;
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'translateY(2px) scale(0.98)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(232,73,29,0.25)';
            e.currentTarget.style.backgroundColor = '#c7421a';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(232,73,29,0.35)';
            e.currentTarget.style.backgroundColor = RED;
          }}
        >
          Order now
        </button>
      </div>

      <div
        style={{
          background: YELLOW,
          color: BLACK,
          fontSize: 13,
          fontWeight: 900,
          letterSpacing: 2,
          textAlign: 'center',
          padding: '12px 0',
        }}
      >
        BRIDGES
      </div>
    </div>
  );
}

export const PromoCards: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 28,
        padding: '28px 24px',
        background: '#F5F3EE',
        justifyContent: 'center',
      }}
    >
      {cards.map((c) => (
        <PromoCard key={c.id} card={c} />
      ))}
    </div>
  );
};
