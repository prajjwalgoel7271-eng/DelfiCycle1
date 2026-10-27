import { useEffect, useState } from 'react';
import data from './data/database.json';
import { db } from './lib/storage';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import DIYHub from './components/DIYHub';
import EcoCoins from './components/EcoCoins';
import Marketplace from './components/Marketplace';
import Merch from './components/Merch';
import Impact from './components/Impact';
import Team from './components/Team';
import EcoBuddy from './components/EcoBuddy';
import Contact from './components/Contact';
import Challenge from './components/Challenge';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

export default function App() {
  const [cart, setCart] = useState(db.getCart());
  const [coins, setCoins] = useState(db.getCoins());
  const [activity, setActivity] = useState(db.getActivity());
  const [completed, setCompleted] = useState(db.getCompleted());
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');

  function notify(text) {
    setToast(text);
    setTimeout(() => setToast(''), 2600);
  }

  useEffect(() => {
    db.saveCart(cart);
  }, [cart]);

  function add(product) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
    notify(`${product.name} added to cart`);
  }

  function remove(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function qty(id, delta) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }

  function checkout() {
    if (!cart.length) return;
    const earned = cart.reduce((sum, item) => sum + item.coins * item.qty, 0);
    const nextCoins = db.addCoins(earned, 'Simulated marketplace purchase');
    setCoins(nextCoins);
    setActivity(db.getActivity());
    setCart([]);
    setCartOpen(false);
    notify(`Checkout complete · +${earned} EcoCoins`);
  }

  function complete(tutorial) {
    const firstTime = db.completeTutorial(tutorial.id);
    if (firstTime) {
      const nextCoins = db.addCoins(tutorial.coins, `Completed ${tutorial.title}`);
      setCoins(nextCoins);
      setActivity(db.getActivity());
      setCompleted(db.getCompleted());
      notify(`Tutorial completed · +${tutorial.coins} EcoCoins`);
    } else {
      notify('Already completed');
    }
  }

  function challengeSubmit(ch, idea) {
    db.saveChallenge({ challengeId: ch.id, title: ch.title, idea });
    const nextCoins = db.addCoins(ch.reward, `Challenge: ${ch.title}`);
    setCoins(nextCoins);
    setActivity(db.getActivity());
    notify(`Challenge submitted · +${ch.reward} EcoCoins`);
  }

  function saveMessage(form) {
    db.saveMessage(form);
    notify('Message saved to local database');
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Navbar
        cartCount={cartCount}
        coins={coins}
        onCart={() => setCartOpen(true)}
      />
      <main>
        <Hero
          onExplore={() =>
            document.querySelector('#marketplace')?.scrollIntoView({ behavior: 'smooth' })
          }
        />
        <About />
        <Process />
        <DIYHub
          tutorials={data.tutorials}
          completed={completed}
          onComplete={complete}
        />
        {data.challenges?.[0] && (
          <Challenge
            challenge={data.challenges[0]}
            onSubmit={challengeSubmit}
          />
        )}
        <EcoCoins coins={coins} activity={activity} />
        <Marketplace products={data.products} onAdd={add} />
        <Merch />
        <Impact impact={data.impact} />
        <Team team={data.team} />
        <Contact onSave={saveMessage} />
      </main>
      <EcoBuddy />
      <Footer />
      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={remove}
          onQty={qty}
          onCheckout={checkout}
        />
      )}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
