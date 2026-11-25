import React from 'react';
import { Bike, Store, ArrowRight } from 'lucide-react';
import { VALUE_PROPS } from '../data/mockData';

interface ValuePropsProps {
  onOpenPartner: (type: 'courier' | 'restaurant') => void;
}

export const ValueProps: React.FC<ValuePropsProps> = ({ onOpenPartner }) => {
  return (
    <section className="bg-white border-y border-line py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-ink max-w-xl">
          Why people in Kenya order with Bridges
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 border-t border-line">
          {VALUE_PROPS.map((prop, i) => (
            <div
              key={prop.id}
              className={`pt-8 pb-2 md:pr-8 ${i > 0 ? 'md:pl-8 md:border-l md:border-line' : ''} ${
                i > 0 ? 'border-t md:border-t-0 border-line mt-8 md:mt-0' : ''
              }`}
            >
              <div className="text-4xl font-semibold tracking-[-0.03em] text-brand">{prop.stat}</div>
              <div className="mt-1 text-sm text-muted">{prop.statLabel}</div>
              <h3 className="mt-6 text-lg font-medium text-ink">{prop.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{prop.description}</p>
            </div>
          ))}
        </div>

        {/* Partner cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md bg-ink text-white p-8 flex flex-col">
            <Bike className="w-6 h-6" strokeWidth={1.75} />
            <h3 className="mt-6 text-xl font-medium">Ride with Bridges</h3>
            <p className="mt-2 text-[15px] text-white/70 max-w-sm">
              Deliver on your motorbike, bicycle or car. Choose your hours and get paid to M-Pesa.
            </p>
            <button
              type="button"
              onClick={() => onOpenPartner('courier')}
              className="mt-8 self-start inline-flex items-center gap-2 h-10 px-4 rounded-md bg-white text-ink text-sm font-medium hover:bg-paper cursor-pointer"
            >
              Apply to ride <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="rounded-md bg-brand text-white p-8 flex flex-col">
            <Store className="w-6 h-6" strokeWidth={1.75} />
            <h3 className="mt-6 text-xl font-medium">Sell on Bridges</h3>
            <p className="mt-2 text-[15px] text-white/75 max-w-sm">
              List your restaurant or shop and reach customers across your city. We handle delivery.
            </p>
            <button
              type="button"
              onClick={() => onOpenPartner('restaurant')}
              className="mt-8 self-start inline-flex items-center gap-2 h-10 px-4 rounded-md bg-white text-ink text-sm font-medium hover:bg-paper cursor-pointer"
            >
              Become a partner <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
